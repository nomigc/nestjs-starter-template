import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, userSchema } from '@/schemas/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL, schema: userSchema }]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
