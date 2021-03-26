import * as mongoose from 'mongoose';
import { type } from 'node:os';

export const StudentSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  age: { type: Number, required: true },
  Gender: { type: String, required: true },
  image: { type: String, required: true },
  comment: {type:String}
});

export interface Student extends mongoose.Document {
  id: string;
  FirstName: string;
  LastName: string;
  age: number;
  Gender: string;
  image: string;
  comment: string
}
