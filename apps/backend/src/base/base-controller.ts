import { Logger } from '@nestjs/common';

export class BaseController {
  protected logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }
}
