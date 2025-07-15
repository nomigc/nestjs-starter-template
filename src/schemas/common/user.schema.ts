import { Prop, Schema } from '@nestjs/mongoose';
import { Role } from '../enums';
import { createModelSchema } from '@/common/helper/common';

@Schema({ timestamps: true })
export class User {
  @Prop()
  firstName: String;

  @Prop()
  lastName: String;

  @Prop({ required: true, unique: true })
  userName: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  password: string;

  @Prop()
  age?: Number;

  @Prop({
    type: String,
    enum: Object.keys(Role),
    immutable: true,
    default: Role.user,
  })
  role?: Role;

  @Prop({
    default: false,
  })
  isEmailVerified?: Boolean;
}

const { schema: userSchema, name: USER_MODEL } = createModelSchema(User);

type UserDocument = User & Document;

export { UserDocument, userSchema, USER_MODEL };
