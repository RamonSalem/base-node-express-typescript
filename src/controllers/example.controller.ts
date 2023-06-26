import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidationException } from '../exceptions/ValidationException';
import { ServerResponse } from '../interfaces/serverResponse.interface';
import ExamplesService from '../services/examples.service';

class ExampleController {
  public static async postExample(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ValidationException(errors));
    }

    const text = req.body.text;

    const example = await ExamplesService.saveOne({ text });
    try {
      const response: ServerResponse = {
        data: example,
        success: true,
      };
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public static async getExamples(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const examples = await ExamplesService.getAll();
      const response: ServerResponse = {
        data: examples,
        success: true,
      };
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default ExampleController;
