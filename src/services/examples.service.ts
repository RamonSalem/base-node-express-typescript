import { ExampleRecord } from '../interfaces/example.interface';
import { ExampleModel } from '../models/example.model';

class ExamplesService {
  async getAll(): Promise<ExampleRecord[]> {
    return await ExampleModel.find({});
  }

  async saveOne(input: ExampleRecord): Promise<ExampleRecord> {
    const example = new ExampleModel(input);
    await example.save();
    return input;
  }
}
export default new ExamplesService();
