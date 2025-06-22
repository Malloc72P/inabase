import { UiConstants } from '@libs/constants/ui.constant';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

export interface UseScrolledProps {
  preserveScroll: boolean;
  preserveKey: string;
}

const DefaultProps: UseScrolledProps = {
  preserveScroll: false,
  preserveKey: '',
};

export function useScrolled({ preserveScroll, preserveKey }: UseScrolledProps = DefaultProps) {
  const [isBottom, setIsBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const restoreLock = useRef(false);

  const getKey = () => {
    return UiConstants.sessionStorage.generateKey('shows');
  };

  const restorePrevScroll = () => {
    if (!preserveScroll || !scrollRef.current || restoreLock.current) return;

    restoreLock.current = true;

    const prevScroll = sessionStorage.getItem(getKey());

    if (prevScroll) {
      const { scrollY: prevScrollY } = JSON.parse(prevScroll);

      scrollRef.current.scrollTop = prevScrollY;
      setScrollY(prevScrollY);
    }
  };

  useEffect(() => {
    if (!preserveScroll || !restoreLock.current) return;

    sessionStorage.setItem(getKey(), JSON.stringify({ scrollY }));
  }, [scrollY]);

  useEffect(() => {
    const clearScroll = () => {
      const key = getKey();

      sessionStorage.removeItem(key);
    };

    window.addEventListener('beforeunload', clearScroll);

    return () => {
      // 페이지를 벗어날 때 스크롤 위치를 초기화한다.
      // 슬라이스 방식으로 가져온 데이터이므로, 새로고침시 새로 가져온 페이지로 이전 스크롤을 복원할 수 없다.
      window.removeEventListener('beforeunload', clearScroll);
    };
  }, []);

  return {
    scrollY,
    isBottom,
    scrollRef,
    isScrolled: scrollY > 0,
    restorePrevScroll,
    // onScrollPositionChange에서 사용할 것.
    watchScroll: (e: { x: number; y: number }) => {
      if (!scrollRef.current) return;

      const { clientHeight, scrollHeight } = scrollRef.current;
      let nextIsBottom = e.y + clientHeight >= scrollHeight;

      setIsBottom(nextIsBottom);
      setScrollY(e.y);
    },
  };
}
