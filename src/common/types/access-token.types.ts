import { Types } from 'mongoose';

export type AccessToken = {
  id: Types.ObjectId;
  role: string;
};
