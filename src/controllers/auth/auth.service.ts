import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { USER_MODEL, UserDocument } from '@/schemas/common';
import {
  CustomConflictException,
  CustomUnauthorizedException,
  makeUserName,
} from '@/utils';
import { HashService } from '@/shared/hash/hash.service';
import {
  createRepositoryHelper,
  existsRepositoryHelper,
} from '@/common/helper/repositories';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto, RegisterDto } from './dto';
import { AppConfigService } from '@/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user: any = await this.userRepository.findOneByEmail(
      loginUserDto?.email,
    );
    if (!user) {
      throw new CustomUnauthorizedException('User not found');
    }

    const isMatch: boolean = await this.hashService.compareHash(
      loginUserDto?.password,
      user.password,
    );
    if (!isMatch) {
      throw new CustomUnauthorizedException('Password is not valid');
    }

    const { id, role, referralUsername } = user;
    const payload = { id, role, referralUsername };
    user.password = null;

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.appConfigService.jwtKey,
      expiresIn: this.appConfigService.tokenExpiresIn,
    });
    return {
      ...user.toObject?.(),
      access_token,
    };
  }

  async register(registerDto: RegisterDto) {
    const { name, email, referralUsername } = registerDto;

    const userName = makeUserName(name);

    userName
      ? await existsRepositoryHelper(userName, 'userName', this.userModel)
      : null;

    const existingUser = await this.userRepository.findOneByEmail(email);
    if (existingUser) {
      throw new CustomConflictException('Email already exists');
    }

    const existingReferralUser =
      await this.userRepository.findUserByUserName(referralUsername);
    if (!existingReferralUser) {
      throw new BadRequestException('Referral username does not exist');
    }

    const hashPassword = await this.hashService.createHash(
      registerDto.password,
    );

    const newUser = {
      ...registerDto,
      password: hashPassword,
      userName: userName,
    };
    const createdUser: any = await createRepositoryHelper(
      newUser,
      USER_MODEL,
      this.userModel,
    );
    createdUser.password = null;

    return createdUser;
  }
}
