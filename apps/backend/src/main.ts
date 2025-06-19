import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { BaseConstants } from './base/base.constant';
import { AppConfig, NodeEnv } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) as ConfigService<AppConfig>;

  await initializeApp(app);

  await app.listen(configService.get('appPort') ?? BaseConstants.app.defaultPort);
}

bootstrap();

export async function initializeApp(app: INestApplication) {
  const configService = app.get(ConfigService) as ConfigService<AppConfig>;

  app.useLogger(
    configService.get('nodeEnv') === NodeEnv.PRODUCTION
      ? ['error', 'warn']
      : ['log', 'error', 'warn', 'debug', 'verbose']
  );

  configCORS(app, configService);
  configCookie(app);
}

/**
 * CORS 설정
 */
function configCORS(app: INestApplication<any>, configService: ConfigService<AppConfig>) {
  app.enableCors({
    credentials: true,
    origin: configService.get('clientUrl'),
  });
}

/**
 * 쿠키 설정
 */
function configCookie(app: INestApplication<any>) {
  app.use(cookieParser());
}
