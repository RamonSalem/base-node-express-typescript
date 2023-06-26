import { InvalidEnvironmentException } from '../exceptions/InvalidEnvironmentException';
import constants from './constants';

interface EnvironmentVars {
  [key: string]: string;
}

class Environment {
  private _environment: EnvironmentVars = {
    SERVER_PORT: process.env.SERVER_PORT || '3000',
    MONGO_USER: process.env.MONGO_USER || 'root',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'root',
    MONGO_PORT: process.env.MONGO_PORT || '27017',
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'main',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    NODE_ENV: process.env.NODE_ENV || 'dev',
  };

  get vars(): EnvironmentVars {
    return this._environment;
  }

  public async validateEnvironmentData(): Promise<void> {
    this.validateEnvironment();
  }

  public validateEnvironment(): void {
    const isValid = this.isEnvValid();
    if (!isValid) {
      throw new InvalidEnvironmentException(
        `Missing required environment variables: ${constants.REQUIRED_ENV_VARS.toString()}`
      );
    }
  }

  public isEnvValid(): boolean {
    const availableEnvKeys = Object.keys(process.env);
    const requiredEnvVars = constants.REQUIRED_ENV_VARS;
    return requiredEnvVars.every((requiredKey) =>
      availableEnvKeys.includes(requiredKey)
    );
  }
}

export const environment = new Environment();
