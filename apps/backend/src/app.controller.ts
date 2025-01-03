import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheckResponse } from '@repo/dto';
import { networkInterfaces } from 'os';
import { BaseController } from '@src/base/base-controller';

@Controller('api/v1/health')
export class AppController extends BaseController {
  constructor() {
    super();
  }

  @Get()
  healthCheck(): HealthCheckResponse {
    this.logger.log('health check');

    return {
      statusCode: 200,
      serverAddr: this.getServerIPAddress(),
    };
  }

  getServerIPAddress() {
    const interfaces = networkInterfaces();
    for (const name in interfaces) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }

    return '127.0.0.1';
  }
}
