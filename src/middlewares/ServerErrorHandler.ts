import { NextFunction, Request, Response } from 'express';

import { ValidationException } from '../exceptions/ValidationException';
import { ServerResponse } from '../interfaces/serverResponse.interface';
import { HttpException } from '../exceptions/HttpException';

class ServerErrorHandler {
  private static httpExceptions = [ValidationException, HttpException];

  private static isHttpException(err: object): boolean {
    const index = this.httpExceptions.findIndex(
      (exception) => err instanceof exception
    );
    return index !== -1;
  }
  public static handleRequestError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (ServerErrorHandler.isHttpException(err)) {
      const errorData = {
        message: err.message,
        name: err.name,
        details: err?.details,
      };

      const response: ServerResponse = {
        data: { ...errorData },
        success: false,
      };
      res.status(err.status).json(response);
    } else {
      const errorData = {
        message: err.message,
        name: err.name,
        details: err?.details,
      };

      const response: ServerResponse = {
        data: { ...errorData },
        success: false,
      };
      res.status(500).json(response);
    }
    next(err);
  }
}

export default ServerErrorHandler;
