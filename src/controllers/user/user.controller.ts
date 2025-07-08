import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { USER_MODEL } from '@/schemas/common';
import { createResponse } from '@/utils';
import { isAdminGuard, JwtAuthGuard } from '@/common/guards';

@UseGuards(JwtAuthGuard, isAdminGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAll();
    return createResponse(`${USER_MODEL} fetched successfully`, users);
  }
}
