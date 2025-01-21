import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseConstants } from './base/base.constant';
import { AppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) as ConfigService<AppConfig>;

  configCORS(app);
  configTransformer(app);

  await app.listen(configService.get('appPort') ?? BaseConstants.app.defaultPort);
}

bootstrap();

/**
 * CORS 설정
 */
function configCORS(app: INestApplication<any>) {
  app.enableCors();
}

/**
 * class transformer 설정
 */
function configTransformer(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // class-transformer 활성화
      transformOptions: {
        excludeExtraneousValues: true, // dto에서 정의하지 않은 속성은 제외한다.
      },
    })
  );
}
