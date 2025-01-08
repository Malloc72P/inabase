import { ConfigModule, registerAs } from '@nestjs/config';

export enum NodeEnv {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
}

export interface AppConfig {
  nodeEnv: NodeEnv;
  appPort: number;
}

export interface DatabaseConfig {
  host: string;
  dbPort: number;
  username: string;
  password: string;
  database: string;
}

/**
 * ConfigModule은 설정을 로드하고 구성할 수 있게 해준다.
 * registerAs를 사용하면 네임스페이스로 설정 객체를 구조화할 수 있다.
 */
export const appConfig = registerAs<AppConfig>('app', () => ({
  nodeEnv: process.env.nodeEnv as NodeEnv,
  appPort: +process.env.port,
}));

export const databaseConfig = registerAs<DatabaseConfig>('database', () => ({
  host: process.env.host,
  dbPort: +process.env.port,
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
}));
