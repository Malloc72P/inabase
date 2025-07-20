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

import { BaseController } from '@src/base/base.controller';
import { TagService } from './tag.service';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { Requester, IRequester } from '@src/util/user-decorator';
import { ZodInput } from '@src/util/zod-validation.pipe';
import {
  FindTagOutput,
  CreateTagInputSchema,
  CreateTagInput,
  CreateTagOutput,
  UpdateTagInputSchema,
  UpdateTagInput,
  UpdateTagOutput,
  DeleteTagOutput,
  FindTagsOutput,
  CommonConstants,
} from '@repo/dto';
import { toTagDetailDto, toTagDto } from './tag-mapper';

@Controller('api/v1/tags')
export class TagController extends BaseController {
  constructor(private tagService: TagService) {
    super();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async tags(
    @Query('keyword') keyword: string = '',
    @Query('pageIndex') pageIndex: number = 0,
    @Query('pageSize') pageSize: number = CommonConstants.paging.tag.pageSize
  ): Promise<FindTagsOutput> {
    const { tags } = await this.tagService.findAll({
      pageIndex,
      pageSize,
      keyword,
    });

    return {
      pageIndex,
      pageSize,
      keyword,
      tags: tags.map((tag) => toTagDto(tag)),
    };
  }

  @Get(':tagId')
  @UseGuards(JwtAuthGuard)
  async tagById(
    @Param('tagId') tagId: string,
    @Requester() requester: IRequester
  ): Promise<FindTagOutput> {
    const { tag } = await this.tagService.findOne({ id: tagId });

    return {
      tag: toTagDetailDto(tag),
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ZodInput(CreateTagInputSchema)
  async create(@Body() param: CreateTagInput): Promise<CreateTagOutput> {
    const { tag } = await this.tagService.create(param);

    return {
      tag: toTagDto(tag),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ZodInput(UpdateTagInputSchema)
  async update(@Param('id') id: string, @Body() param: UpdateTagInput): Promise<UpdateTagOutput> {
    const { tag } = await this.tagService.update({ id, ...param });

    return {
      tag: toTagDetailDto(tag),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<DeleteTagOutput> {
    await this.tagService.remove({ id });

    return {
      success: true,
    };
  }
}
