import { connect, set, connection } from 'mongoose';
import { environment } from '../config/environment';

class MongodbService {
  async start(): Promise<void> {
    const connectionString = `mongodb://${
      environment.vars.MONGO_USER
    }:${encodeURIComponent(environment.vars.MONGO_PASSWORD)}@${
      environment.vars.MONGO_HOST
    }:${environment.vars.MONGO_PORT}/${
      environment.vars.MONGO_DATABASE
    }?directConnection=true`;
    set('strictQuery', false);
    await connect(connectionString);
  }

  async close(): Promise<void> {
    connection.close();
  }

  async dropTestDB(): Promise<void> {
    if (environment.vars.NODE_ENV === 'test') {
      await connection.dropDatabase();
    }
    await connection.dropDatabase();
  }
}
export const mongo = new MongodbService();
