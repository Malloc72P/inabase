import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ShowModule } from './show/show.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/database.provider';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ShowModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
