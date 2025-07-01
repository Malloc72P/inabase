import { ShowDto } from '@repo/dto';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect } from 'react';

export interface UseShowsVirtualizerProps {
  shows: ShowDto[];
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function useShowsVirtualizer({ shows, scrollRef }: UseShowsVirtualizerProps) {
  const rowVirtualizer = useVirtualizer({
    enabled: !!scrollRef.current,
    count: shows.length,
    getScrollElement: () => scrollRef?.current,
    estimateSize: () => 135,
    overscan: 20,
  });

  useEffect(() => {
    // paint 이후에 실행되므로, 이 시점엔 ref에 DOM 노드가 연결된 상태이다.
    const init = () => {
      if (!scrollRef.current) {
        // 만약 scrollRef가 아직 연결되지 않은 상태라면, 다음 프레임에 다시 시도한다.
        requestAnimationFrame(init);
        return;
      }

      rowVirtualizer.setOptions({
        ...rowVirtualizer.options,
        getScrollElement: () => scrollRef.current as HTMLDivElement,
      });
      rowVirtualizer.measure();
    };

    init();
  }, []);

  return { rowVirtualizer };
}
