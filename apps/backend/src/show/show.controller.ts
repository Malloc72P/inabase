import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { FindShowsInput, FindShowsInputSchema, FindShowsOutput, ShowDtoSchema } from '@repo/dto';
import { BaseController } from '@src/base/base.controller';
import { transformTo } from '@src/util/transformer.util';
import { ShowService } from './show.service';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { ZodInput } from '@src/util/zod-validation.pipe';

@Controller('api/v1/shows')
export class ShowController extends BaseController {
  constructor(private showService: ShowService) {
    super();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ZodInput(FindShowsInputSchema)
  async shows(@Body() param: FindShowsInput): Promise<FindShowsOutput> {
    const { shows } = await this.showService.findAll();

    return {
      shows: shows.map((show) => transformTo(ShowDtoSchema, show)),
    };
  }
}
