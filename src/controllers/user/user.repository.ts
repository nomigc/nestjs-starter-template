import { USER_MODEL, UserDocument } from '@/schemas/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}

  findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
}
