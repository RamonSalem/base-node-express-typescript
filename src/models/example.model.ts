import { ExampleRecord } from '../interfaces/example.interface';
import { Schema, model } from 'mongoose';

const ExampleSchema = new Schema<ExampleRecord>({
  text: { type: String, required: true },
});
export const ExampleModel = model<ExampleRecord>('Example', ExampleSchema);
