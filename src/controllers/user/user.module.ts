import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, userSchema } from '@/schemas/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL, schema: userSchema }]),
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository],
})
export class UserModule {}
