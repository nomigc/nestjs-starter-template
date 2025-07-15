import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { USER_MODEL, UserDocument } from '@/schemas/common';
import { CustomBadRequestException, CustomConflictException } from '@/utils';
import { HashService } from '@/shared/hash/hash.service';
import {
  createRepositoryHelper,
  existsRepositoryHelper,
} from '@/common/helper/repositories';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto, LoginUserDto } from './dto';
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
      throw new CustomBadRequestException('Email or password is not valid');
    }

    const isMatch: boolean = await this.hashService.compareHash(
      loginUserDto?.password,
      user.password,
    );
    if (!isMatch) {
      throw new CustomBadRequestException('Password is not valid');
    }

    const { id, role } = user;
    const payload = { id, role };
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

  async register(createAuthDto: CreateAuthDto) {
    const { email, userName } = createAuthDto;

    userName
      ? await existsRepositoryHelper(userName, 'userName', this.userModel)
      : null;

    const existingUser = await this.userRepository.findOneByEmail(email);
    if (existingUser) {
      throw new CustomConflictException('Email already exists');
    }

    if (createAuthDto.password !== createAuthDto.confirmPassword) {
      throw new CustomBadRequestException('Password does not match');
    }

    const hashPassword = await this.hashService.createHash(
      createAuthDto.password,
    );
    const newUser = { ...createAuthDto, password: hashPassword };
    const createdUser: any = await createRepositoryHelper(
      newUser,
      USER_MODEL,
      this.userModel,
    );
    createdUser.password = null;

    return createdUser;
  }
}
