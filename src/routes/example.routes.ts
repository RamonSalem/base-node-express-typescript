import { Router } from 'express';
import ExampleValidator from '../middlewares/validators/example.validator';
import ExampleController from '../controllers/example.controller';

const ExampleRoutes = Router();

ExampleRoutes.post(
  '/examples',
  ExampleValidator.validatePostExample(),
  ExampleController.postExample
);

ExampleRoutes.get('/examples', ExampleController.getExamples);

export default ExampleRoutes;
