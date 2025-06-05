import { BadRequestException, Module, ValidationError } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from './database/database.provider';
import { HasherModule } from './hasher/hasher.module';
import { ShowModule } from './show/show.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { LoggingExceptionFilter } from './config/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { FieldError } from '@repo/exceptions';
import { InvalidFieldException } from './exceptions/invalid-field.exception';
import { ValidationExceptionFilter } from './config/validation.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    ShowModule,
    UserModule,
    AuthModule,
    HasherModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors) => {
          const fieldErrors: FieldError[] = errors.map((error) => ({
            field: error.property,
            message: error.constraints[Object.keys(error.constraints)[0]],
          }));

          return new InvalidFieldException(fieldErrors);
        },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: LoggingExceptionFilter,
    },
  ],
})
export class AppModule {}
