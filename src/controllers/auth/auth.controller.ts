import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createResponse } from '@/utils';
import { USER_MODEL } from '@/schemas/common';
import { CreateAuthDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() registerUserDto: CreateAuthDto) {
    const newUser = await this.authService.register(registerUserDto);
    return createResponse(`${USER_MODEL} created successfully`, newUser);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const loginUser = await this.authService.login(loginUserDto);
    return createResponse(`${USER_MODEL} logged in successfully`, loginUser);
  }
}
