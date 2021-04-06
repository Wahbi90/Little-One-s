import * as mongoose from 'mongoose';
import { time } from 'node:console';
import { type } from 'node:os';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: String },
  phoneNumber: { type: Number, required: true },
  userType: { type: String, required: true },
  gender: { type: String, required: true },
});

export interface User extends mongoose.Document {
  firstName: string,
  email: string,
  id: string,
  createdAt: string
  phoneNumber: number
  userType: string
  gender: string
}
