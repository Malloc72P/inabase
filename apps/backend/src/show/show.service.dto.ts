import { Show } from '@prisma/client';

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
  shows: Show[];
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
  show: Show;
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
  show: Show;
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
  show: Show;
}

//-------------------------------------------------------------------------
// remove
//-------------------------------------------------------------------------

export interface ShowServiceRemoveInput {
  id: string;
}

export type ShowServiceRemoveOutput = void;
