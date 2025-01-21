import { Controller, Get } from '@nestjs/common';
import { FindShowsOutput, ShowDto } from '@repo/dto';
import { BaseController } from '@src/base/base.controller';
import { transformTo } from '@src/util/transformer.util';
import { ShowService } from './show.service';

@Controller('api/v1/shows')
export class ShowController extends BaseController {
  constructor(private showService: ShowService) {
    super();
  }

  @Get()
  async shows(): Promise<FindShowsOutput> {
    const { shows } = await this.showService.findAll();

    return {
      shows: shows.map((show) => transformTo(ShowDto, show)),
    };
  }
}
