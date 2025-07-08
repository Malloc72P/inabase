import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { LoggingExceptionFilter } from './config/global-exception.filter';
import { ValidationExceptionFilter } from './config/validation.filter';
import { CursorModule } from './cursor/cursor.module';
import { HasherModule } from './hasher/hasher.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ShowModule } from './show/show.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tags/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ShowModule,
    TagModule,
    UserModule,
    AuthModule,
    HasherModule,
    TokenModule,
    CursorModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: LoggingExceptionFilter,
    },
    PrismaService,
  ],
})
export class AppModule {}
