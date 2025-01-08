import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { BaseConstants } from './base/base.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) as ConfigService<AppConfig>;

  app.enableCors();

  await app.listen(configService.get('appPort') ?? BaseConstants.app.defaultPort);
}

bootstrap();
