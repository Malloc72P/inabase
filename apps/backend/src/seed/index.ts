import { AppDataSource } from '@src/database/database.provider';
import { Show } from '@src/show/show.entity';
import ShowSeeder from '@src/show/show.seed';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager, SeederOptions } from 'typeorm-extension';

const dataSourceOption = {
  ...AppDataSource.options,
  seeds: [ShowSeeder],
};

export default new DataSource(dataSourceOption as DataSourceOptions & SeederOptions);
