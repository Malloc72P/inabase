'use client';

import { ShowListItem } from '@components/show-list-item';
import { ShowDto } from '@repo/dto';

export interface MainPageBodyProps {
  shows: ShowDto[];
}

export function MainPageBody({ shows }: MainPageBodyProps) {
  return (
    <>
      {shows.map((show) => (
        <ShowListItem key={show.id} title={show.title} tags={show.tags} />
      ))}
    </>
  );
}
