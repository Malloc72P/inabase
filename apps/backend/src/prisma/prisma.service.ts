import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { AppConfig, NodeEnv } from '@src/config/app.config';

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

  /**
   * 벡터 검색을 위한 키워드 생성.
   * 검색어를 공백으로 분리하고, 각 단어에 대해 TSQUERY 형식으로 변환합니다.
   */
  buildSearchKeyword(input?: string): string | undefined {
    if (!input) return;

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
