import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient, Show } from '@prisma/client';
import { AppConfig, NodeEnv } from '@src/config/app.config';
import { ShowCursor } from '@src/show/show.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  //-------------------------------------------------------------------------
  // static members
  //-------------------------------------------------------------------------
  private static readonly TSQUERY_ESCAPE_RE = /[&|!:()\\]/g;

  //-------------------------------------------------------------------------
  // consts
  //-------------------------------------------------------------------------
  constructor(configService: ConfigService<AppConfig>) {
    super({
      log:
        configService.get('nodeEnv') === NodeEnv.DEVELOPMENT
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  //-------------------------------------------------------------------------
  // methods
  //-------------------------------------------------------------------------
  async onModuleInit() {
    await this.$connect();
  }

  buildOrQuery(input: string): string {
    return input
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (word) => word.replace(PrismaService.TSQUERY_ESCAPE_RE, '\\$&') + ':*' // escape + prefix
      )
      .join(' | ');
  }
}
