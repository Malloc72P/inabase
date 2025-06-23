'use client';

import { InaText } from '@components/custom-components';
import { ShowTagBadge } from '@components/show/show-badge';
import { useNavigator } from '@hooks/use-navigator';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useShow } from '@hooks/use-show';
import { useShowMutation } from '@hooks/use-show-mutation';
import { ApiError } from '@libs/fetcher';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider';
import { Badge, Button, Divider, Flex, Skeleton, Space } from '@mantine/core';

export interface ShowDetailPageProps {
  showId: string;
}

export function ShowDetailPage({ showId }: ShowDetailPageProps) {
  const { show, isShowLoading } = useShow(showId);
  const { deleteShow } = useShowMutation();
  const navigator = useNavigator();
  const { setGlobalLoading } = useGlobalLoadingStore();

  const onDeleteBtnClicked = async () => {
    try {
      setGlobalLoading(true);
      await deleteShow(showId);

      notifySuccess({ message: `${show?.title} 이(가) 삭제되었습니다.` });
      navigator.moveTo.protected.shows.list();
    } catch (error) {
      const apiError = error as ApiError;
      console.error('Failed to delete show:', error);
      notifyError({ message: apiError.message });
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <div>
      <Flex align={'center'} mb={16}>
        <InaText
          bold
          fontSize={24}
          loading={isShowLoading}
          skeletonWidth={300}
          skeletonHeight={37.19}
        >
          {show?.title}
        </InaText>

        <Space style={{ flexGrow: 1 }} />

        <Flex gap={'lg'}>
          <Button variant="default" onClick={onDeleteBtnClicked}>
            Delete
          </Button>
          <Button variant="default" onClick={() => navigator.moveTo.protected.shows.edit(showId)}>
            Edit
          </Button>
          <Button onClick={() => navigator.moveTo.protected.shows.create()}>New show</Button>
        </Flex>
      </Flex>

      <Flex gap={'md'} mb={32}>
        {isShowLoading ? (
          <TagSkeletons />
        ) : (
          <>
            {show && <ShowTagBadge size="lg" tag={show.id} />}
            {show?.tags.map((tag) => <ShowTagBadge size="lg" key={tag} tag={tag} />)}
          </>
        )}
      </Flex>

      <Divider my={32} />

      <InaText>{show?.description}</InaText>
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
