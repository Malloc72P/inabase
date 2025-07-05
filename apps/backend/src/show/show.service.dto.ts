import { Show } from '@prisma/client';
import { ShowTagsWithTag, ShowWithTags } from './show.entity';
import { ShowDto } from '@repo/dto';

//-------------------------------------------------------------------------
// Cursor
//-------------------------------------------------------------------------
export type ShowCursor = { keyword: string | undefined; createdAt: string; id: string };

//-------------------------------------------------------------------------
// findAll
//-------------------------------------------------------------------------
export interface ShowServiceFindAllInput {
  cursor?: string;
  keyword?: string;
  pageSize?: number;
}

export interface ShowServiceFindAllOutput {
  shows: ShowDto[];
  nextCursor: string;
  hasNext: boolean;
}

//-------------------------------------------------------------------------
// findOne
//-------------------------------------------------------------------------

export interface ShowServiceFindOneInput {
  id: string;
}

export interface ShowServiceFindOneOutput {
  show: ShowWithTags;
}

//-------------------------------------------------------------------------
// create
//-------------------------------------------------------------------------

export interface ShowServiceCreateInput {
  title: string;
  description: string;
  tags: string[];
}

export interface ShowServiceCreateOutput {
  show: ShowWithTags;
}

//-------------------------------------------------------------------------
// update
//-------------------------------------------------------------------------

export interface ShowServiceUpdateInput {
  id: string;
  title?: string;
  description?: string;
  tags: string[];
}

export interface ShowServiceUpdateOutput {
  show: ShowWithTags;
}

//-------------------------------------------------------------------------
// remove
//-------------------------------------------------------------------------

export interface ShowServiceRemoveInput {
  id: string;
}

export type ShowServiceRemoveOutput = void;
