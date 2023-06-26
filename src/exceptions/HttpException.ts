export class HttpException extends Error {
  status: number;
  message: string;
  details: object | string;

  constructor(status: number, message: string, details: object | string) {
    super(message);
    this.status = status;
    this.message = message;
    this.details = details;
  }
}
