import { useScrolled } from '@hooks/use-scrolled';
import { useEffect, useRef } from 'react';

export interface UseShowScrollProps {}

export function useShowScroll() {
  const restoreLock = useRef(false);
  const { scrollRef, isBottom, isScrolled, watchScroll, restorePrevScroll } = useScrolled({
    preserveScroll: true,
    preserveKey: 'shows',
  });

  useEffect(() => {
    if (restoreLock.current) return;
    restoreLock.current = true;

    const restore = () => {
      const listCount = document.getElementById('ina-show-list')?.children.length;
      const emptyView = document.getElementById('ina-show-list-empty');

      if (emptyView) {
        // 빈 목록일 경우, 스크롤 복원하지 않음.
        return;
      }

      if (listCount === 0) {
        return requestAnimationFrame(() => {
          restore();
        });
      }

      restorePrevScroll();
    };

    restore();
  }, []);

  return { scrollRef, isBottom, isScrolled, watchScroll };
}
