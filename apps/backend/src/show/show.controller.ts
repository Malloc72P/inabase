import { Controller, Get } from '@nestjs/common';
import { ShowService } from './show.service';
import { FindShowsOutput } from '@repo/dto';

@Controller('api/v1/shows')
export class ShowController {
  constructor(private showService: ShowService) {}

  @Get()
  async shows(): Promise<FindShowsOutput> {
    const shows = await this.showService.findAll();

    return {
      shows,
    };
  }
}
