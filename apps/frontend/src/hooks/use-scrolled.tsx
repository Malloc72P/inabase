import { UiConstants } from '@libs/constants/ui.constant';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

export function useScrolled() {
  const [isBottom, setIsBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  return {
    scrollY,
    setScrollY,
    isBottom,
    scrollRef,
    isScrolled: scrollY > 0,
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
