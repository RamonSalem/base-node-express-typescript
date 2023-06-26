import Express from './express';
import { environment } from './environment';
import { mongo } from '../services/mongodb.service';

class App {
  async startServer(): Promise<void> {
    await environment.validateEnvironmentData();
    await Express.startServer();
  }

  async initMongo(): Promise<void> {
    await mongo.start();
  }

  async stopMongo(): Promise<void> {
    await mongo.close();
  }

  async dropMongo(): Promise<void> {
    await mongo.dropTestDB();
  }
}

export default new App();
