import { Tag } from '@prisma/client';

//-------------------------------------------------------------------------
// findAll
//-------------------------------------------------------------------------
export interface TagServiceFindAllInput {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface TagServiceFindAllOutput {
  tags: Tag[];
  pageIndex: number;
  pageSize: number;
}

//-------------------------------------------------------------------------
// findOne
//-------------------------------------------------------------------------

export interface TagServiceFindOneInput {
  id: string;
}

export interface TagServiceFindOneOutput {
  tag: Tag;
}

//-------------------------------------------------------------------------
// create
//-------------------------------------------------------------------------

export interface TagServiceCreateInput {
  label: string;
}

export interface TagServiceCreateOutput {
  tag: Tag;
}

//-------------------------------------------------------------------------
// update
//-------------------------------------------------------------------------

export interface TagServiceUpdateInput {
  id: string;
  label: string;
}

export interface TagServiceUpdateOutput {
  tag: Tag;
}

//-------------------------------------------------------------------------
// remove
//-------------------------------------------------------------------------

export interface TagServiceRemoveInput {
  id: string;
}

export interface TagServiceRemoveOutput {
  success: boolean;
}
