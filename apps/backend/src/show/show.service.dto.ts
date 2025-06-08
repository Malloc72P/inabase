import { Show } from './show.entity';

//-------------------------------------------------------------------------
// findAll
//-------------------------------------------------------------------------
export interface ShowServiceFindAllInput {}

export interface ShowServiceFindAllOutput {
  shows: Show[];
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
  tags: string[];
}

export interface ShowServiceCreateOutput {
  show: Show;
}

//-------------------------------------------------------------------------
// remove
//-------------------------------------------------------------------------

export interface ShowServiceRemoveInput {
  id: string;
}

export type ShowServiceRemoveOutput = void;
