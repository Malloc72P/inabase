import { useScrolled } from '@hooks/use-scrolled';
import { UiConstants } from '@libs/constants/ui.constant';
import { useEffect, useRef } from 'react';

export interface UseShowScrollProps {
  keyword: string;
}

export function useShowScroll({ keyword }: UseShowScrollProps) {
  const restoreLock = useRef(false);
  const { scrollY, setScrollY, scrollRef, isBottom, isScrolled, watchScroll } = useScrolled();

  const getKey = () => {
    return UiConstants.sessionStorage.generateKey('shows');
  };

  /**
   * 이전 스크롤 위치를 복원한다.
   * @returns
   */
  const restoreScroll = () => {
    if (!scrollRef.current) return;

    const prevScroll = sessionStorage.getItem(getKey());
    if (!prevScroll) return;

    const { scrollY: prevScrollY, keyword: prevKeyword } = JSON.parse(prevScroll);

    // 키워드가 다르면 스크롤 위치를 복원하지 않는다.
    if (keyword !== prevKeyword) return;

    scrollRef.current.scrollTop = prevScrollY;
    setScrollY(prevScrollY);
  };

  // 스크롤 위치를 sessionStorage에 저장한다.
  useEffect(() => {
    if (!restoreLock.current) return;

    sessionStorage.setItem(getKey(), JSON.stringify({ keyword, scrollY }));
  }, [scrollY]);

  // 페이지를 벗어날 때 스크롤 위치를 초기화한다.
  useEffect(() => {
    const clearScroll = () => sessionStorage.removeItem(getKey());

    window.addEventListener('beforeunload', clearScroll);
    return () => window.removeEventListener('beforeunload', clearScroll);
  }, []);

  return { scrollRef, isBottom, isScrolled, watchScroll, restoreScroll, restoreLock };
}
