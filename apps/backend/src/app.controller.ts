import { Controller, Get } from '@nestjs/common';
import { DateUtil } from '@repo/date-util';
import { HealthCheckOutput, HealthCheckOutputSchema } from '@repo/dto';
import { BaseController } from './base/base.controller';
import { transformTo } from './util/transformer.util';

@Controller('api/v1/health')
export class AppController extends BaseController {
  constructor() {
    super();
  }

  @Get()
  healthCheck(): HealthCheckOutput {
    this.logger.log('health check');

    const now = DateUtil.format(DateUtil.now(), 'long');

    return transformTo(HealthCheckOutputSchema, {
      statusCode: 200,
      dateTime: now,
    });
  }
}
