import { Prop, Schema } from '@nestjs/mongoose';
import { Role } from '../enums';
import { createModelSchema } from '@/common/helper/common';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: String;

  @Prop({ required: true, unique: true })
  userName: String;

  @Prop({ required: true, unique: true })
  phoneNumber: String;

  @Prop({ required: true, unique: true })
  email: String;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  referralUsername: String;

  @Prop({
    type: String,
    enum: Object.keys(Role),
    immutable: true,
    default: Role.user,
  })
  role: Role;

  @Prop({
    default: false,
  })
  isEmailVerified?: Boolean;

  @Prop({
    type: Date,
    default: Date.now,
  })
  joiningDate: Date;
}

const { schema: userSchema, name: USER_MODEL } = createModelSchema(User);

type UserDocument = User & Document;

export { UserDocument, userSchema, USER_MODEL };
