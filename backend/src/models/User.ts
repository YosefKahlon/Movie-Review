import { Schema, model, Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  name: string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export default model<IUser>('User', userSchema);
