import express, { Application } from 'express';
import { Server } from 'http';
import ServerErrorHandler from '../middlewares/ServerErrorHandler';
import exampleRoutes from '../routes/example.routes';
import { environment } from './environment';
import morgan from 'morgan';

class Express {
  public express: Application;
  public server: Server | null = null;

  constructor() {
    this.express = express();
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    if (process.env.NODE_ENV !== 'test') {
      this.configureLogger();
    }
    // this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorMiddlewares();
  }

  /* Add routes to express here  */
  private configureRoutes(): void {
    this.express.use('/', exampleRoutes);
  }

  /* Add morgan logger */
  private configureLogger(): void {
    this.express.use(morgan('combined'));
  }

  /* Add middlewares to express here */
  // private configureMiddlewares(): void {
  // }

  /* Add error middlewares to express here */
  private configureErrorMiddlewares(): void {
    this.express.use(ServerErrorHandler.handleRequestError);
  }

  public async startServer(): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.express
        .listen(environment.vars.SERVER_PORT, () => {
          console.log(
            `Server is running at http://localhost:${environment.vars.SERVER_PORT}`
          );
          resolve();
        })
        .on('error', (error: Error) =>
          console.log(`Error initializing the server: ${error.message}`)
        );
    });
  }

  public closeServer(): void {
    this.server?.close();
  }
}

export default new Express();
