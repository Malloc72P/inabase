import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ShowModule } from './show/show.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/database.provider';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    ShowModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
