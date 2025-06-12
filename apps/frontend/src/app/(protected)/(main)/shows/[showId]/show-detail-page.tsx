'use client';

import { InaText } from '@components/custom-components';
import { useShow } from '@hooks/use-show';
import { Badge, Box, Divider, Flex, Skeleton, Title } from '@mantine/core';

export interface ShowDetailPageProps {
  showId: string;
}

export function ShowDetailPage({ showId }: ShowDetailPageProps) {
  const { show, isShowLoading } = useShow(showId);

  return (
    <div>
      <Box mb={32}>
        <InaText
          bold
          fontSize={24}
          loading={isShowLoading}
          skeletonWidth={300}
          skeletonHeight={37.19}
        >
          {show?.title}
        </InaText>
      </Box>

      <Flex gap={'md'} mb={32}>
        {isShowLoading ? (
          <TagSkeletons />
        ) : (
          show?.tags.map((tag) => (
            <Badge variant="light" size="xl" key={tag}>
              {tag}
            </Badge>
          ))
        )}
      </Flex>

      <Divider />
    </div>
  );
}

export function TagSkeletons() {
  return (
    <>
      <Skeleton width={100} height={30} />
      <Skeleton width={100} height={30} />
      <Skeleton width={100} height={30} />
    </>
  );
}
