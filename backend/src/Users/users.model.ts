import * as mongoose from 'mongoose';
import { time } from 'node:console';
import { type } from 'node:os';

export const UserSchema = new mongoose.Schema({
  FirstName : { type: String, required: true },
  LastName:{ type: String, required: true },
  Email:{ type: String, required: true },
  Gender:{ type: String, required: true },
  PhoneNumber:{ type: Number, required: true },
  Types:{ type: String, required: true },
  createdAt: { type: time }
});

export interface User extends mongoose.Document {
  id:string
  FirstName : string,
  LastName:string,
  Email:string,
  Gender:string,
  PhoneNumber:number,
  Types:string,
  createdAt:any,
}
