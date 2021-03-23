import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  age: { type: Number, required: true },
  Gender: { type: String, required: true },
  image: { type: String, required: true },
});

export interface Student extends mongoose.Document {
  id: string;
  FirstName: string;
  LastName: string;
  age: number;
  Gender: string;
  image: string;
}
