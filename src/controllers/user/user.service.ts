import { getAllRepositoryHelper } from '@/common/helper/repositories';
import { USER_MODEL, UserDocument } from '@/schemas/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async getAll(): Promise<any> {
    const users = await this.userModel.find({}).lean().exec();
    return users;
  }
}
