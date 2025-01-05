import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 30700,
  username: 'dev',
  password: 'dev',
  database: 'inabase',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
});
