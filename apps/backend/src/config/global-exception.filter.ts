import { Catch, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AccessTokenExpiredException } from '@src/exceptions/access-token-expired.exception';
import { InvalidFieldException } from '@src/exceptions/invalid-field.exception';

/**
 * 글로벌 예외 필터
 * 모든 예외를 잡아서 로깅합니다. 특정 예외는 로깅하지 않도록 화이트리스트를 적용합니다.
 */
@Catch()
export class LoggingExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(LoggingExceptionFilter.name);
  private readonly WHITELIST = [
    UnauthorizedException.name,
    NotFoundException.name,
    AccessTokenExpiredException.name,
    InvalidFieldException.name,
  ];

  catch(exception: any, host: any) {
    super.catch(exception, host);

    if (this.isWhitelisted(exception)) {
      this.logger.debug(`Whitelisted Exception: ${exception.message}\n`, exception.stack);
      return;
    }

    this.logger.error(`Unhandled Exception: ${exception.message}\n`, exception.stack);

    if (exception.origin) {
      this.logger.error('origin error: ', exception.origin?.message);
    }
  }

  private isWhitelisted(exception: any) {
    return this.WHITELIST.some((white) => white === exception?.name);
  }
}
