import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseConstants } from './base/base.constant';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) as ConfigService<AppConfig>;

  configCORS(app);

  await app.listen(configService.get('appPort') ?? BaseConstants.app.defaultPort);
}

bootstrap();

/**
 * CORS 설정
 */
function configCORS(app: INestApplication<any>) {
  app.enableCors();
}
