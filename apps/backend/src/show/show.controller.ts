import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  CreateShowInput,
  CreateShowInputSchema,
  CreateShowOutput,
  FindShowsOutput,
  ShowDtoSchema,
  DeleteShowOutput,
  UpdateShowInputSchema,
  UpdateShowOutput,
  UpdateShowInput,
  FindShowOutput,
} from '@repo/dto';
import { BaseController } from '@src/base/base.controller';
import { transformTo } from '@src/util/transformer.util';
import { ShowService } from './show.service';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { ZodInput } from '@src/util/zod-validation.pipe';
import { Requester, IRequester } from '@src/util/user-decorator';

@Controller('api/v1/shows')
export class ShowController extends BaseController {
  constructor(private showService: ShowService) {
    super();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async shows(): Promise<FindShowsOutput> {
    const { shows } = await this.showService.findAll();

    return {
      shows: shows.map((show) => transformTo(ShowDtoSchema, show)),
    };
  }

  @Get(':showId')
  @UseGuards(JwtAuthGuard)
  async showById(
    @Param('showId') showId: string,
    @Requester() requester: IRequester
  ): Promise<FindShowOutput> {
    this.logger.log('showById', { showId, requester });

    const { show } = await this.showService.findOne({ id: showId });

    this.logger.log('showById', show);

    return {
      show: transformTo(ShowDtoSchema, show),
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ZodInput(CreateShowInputSchema)
  async create(@Body() param: CreateShowInput): Promise<CreateShowOutput> {
    const { show } = await this.showService.create(param);

    return {
      show: transformTo(ShowDtoSchema, show),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ZodInput(UpdateShowInputSchema)
  async update(@Param('id') id: string, @Body() param: UpdateShowInput): Promise<UpdateShowOutput> {
    const { show } = await this.showService.update({ id, ...param });

    return {
      show: transformTo(ShowDtoSchema, show),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<DeleteShowOutput> {
    await this.showService.remove({ id });

    return {
      success: true,
    };
  }
}
