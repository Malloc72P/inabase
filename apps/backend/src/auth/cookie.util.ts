import { ConfigService } from '@nestjs/config';

export function createCookieOption(configService: ConfigService) {
  return {
    secure: configService.get('NODE_ENV') === 'production',
    httpOnly: true,
  };
}
