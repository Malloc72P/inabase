import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateShowInput,
  CreateShowInputSchema,
  CreateShowOutput,
  DeleteShowOutput,
  FindShowOutput,
  FindShowsOutput,
  UpdateShowInput,
  UpdateShowInputSchema,
  UpdateShowOutput,
} from '@repo/dto';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { BaseController } from '@src/base/base.controller';
import { IRequester, Requester } from '@src/util/user-decorator';
import { ZodInput } from '@src/util/zod-validation.pipe';
import { toShowDetailDto, toShowDto } from './show-mapper';
import { ShowSearchService } from './show-search.service';
import { ShowService } from './show.service';

@Controller('api/v1/shows')
export class ShowController extends BaseController {
  constructor(
    private showService: ShowService,
    private showSearchService: ShowSearchService
  ) {
    super();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async shows(
    @Query('cursor') cursor?: string,
    @Query('keyword') keyword?: string
  ): Promise<FindShowsOutput> {
    const { shows, hasNext, nextCursor } = await this.showSearchService.findAll({
      cursor,
      keyword,
    });

    return {
      shows: shows.map(toShowDto),
      hasNext,
      nextCursor,
      keyword: keyword || '',
    };
  }

  @Get(':showId')
  @UseGuards(JwtAuthGuard)
  async showById(
    @Param('showId') showId: string,
    @Requester() requester: IRequester
  ): Promise<FindShowOutput> {
    const { show } = await this.showService.findOne({ id: showId });

    return {
      show: toShowDetailDto(show),
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ZodInput(CreateShowInputSchema)
  async create(@Body() param: CreateShowInput): Promise<CreateShowOutput> {
    const { show } = await this.showService.create(param);

    return {
      show: toShowDto(show),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ZodInput(UpdateShowInputSchema)
  async update(@Param('id') id: string, @Body() param: UpdateShowInput): Promise<UpdateShowOutput> {
    const { show } = await this.showService.update({ id, ...param });

    return {
      show: toShowDetailDto(show),
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
