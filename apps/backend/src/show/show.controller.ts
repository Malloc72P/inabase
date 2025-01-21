import { Controller, Get } from '@nestjs/common';
import { FindShowsOutput, ShowDto } from '@repo/dto';
import { plainToInstance } from 'class-transformer';
import { ShowService } from './show.service';

@Controller('api/v1/shows')
export class ShowController {
  constructor(private showService: ShowService) {}

  @Get()
  async shows(): Promise<FindShowsOutput> {
    const { shows } = await this.showService.findAll();

    return {
      shows: shows.map((show) => plainToInstance(ShowDto, show)),
    };
  }
}
