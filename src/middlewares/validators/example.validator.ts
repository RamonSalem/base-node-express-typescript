import { body } from 'express-validator';

class ExampleValidator {
  public static validatePostExample() {
    return [body('text', 'Invalid/required example').exists().isString()];
  }
}

export default ExampleValidator;
