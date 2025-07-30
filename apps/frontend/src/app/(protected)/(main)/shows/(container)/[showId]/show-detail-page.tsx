'use client';

import { IconButton } from '@components/buttons';
import { InaText } from '@components/custom-components';
import { useNavigator } from '@hooks/use-navigator';
import { notifyError, notifySuccess } from '@hooks/use-notification';
import { useShow } from '@libs/query-client/hooks/use-show';
import { useShowMutation } from '@libs/query-client/hooks/use-show-mutation';
import { ApiError } from '@libs/fetcher';
import { useGlobalLoadingStore } from '@libs/stores/loading-overlay-provider';
import { Divider, Flex, Skeleton, Space } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { ShowTagBadge } from '@components/tags';

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
      {/* ------ 제목, (삭제, 수정, 생성) 버튼 그룹 ------ */}
      <Flex align={'center'} mb={16} miw={0} gap={'md'}>
        <InaText
          bold
          fontSize={24}
          loading={isShowLoading}
          skeletonWidth={300}
          skeletonHeight={37.19}
          title={show?.title}
          style={{
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {show?.title}
        </InaText>

        <Space style={{ flexGrow: 1 }} />

        <Flex gap={'md'}>
          <IconButton
            icon={IconPencil}
            variant="transparent"
            onClick={() => navigator.moveTo.protected.shows.edit(showId)}
          />
          <IconButton icon={IconTrash} variant="transparent" onClick={onDeleteBtnClicked} />
        </Flex>
      </Flex>

      {/* ------ 태그 컨테이너 ------ */}
      <Flex gap={'md'} my={'md'}>
        {isShowLoading ? (
          <TagSkeletons />
        ) : (
          <>{show?.tags.map((tag) => <ShowTagBadge size="lg" key={tag.id} tag={tag.label} />)}</>
        )}
      </Flex>

      <Divider my={'md'} />

      {/* ------ 본문 ------ */}
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
