import { HttpException } from './HttpException';

export class ValidationException extends HttpException {
  constructor(details: object | string) {
    super(400, 'Validation Error', details);
  }
}
