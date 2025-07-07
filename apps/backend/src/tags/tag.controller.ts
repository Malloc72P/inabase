import { Controller } from '@nestjs/common';

import { BaseController } from '@src/base/base.controller';
import { TagService } from './tag.service';

@Controller('api/v1/tags')
export class TagController extends BaseController {
  constructor(private tagService: TagService) {
    super();
  }
}
