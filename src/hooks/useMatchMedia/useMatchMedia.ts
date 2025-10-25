import { useSyncExternalStore } from 'react';

export function useMediaQuery(mediaQuery: string): boolean {
  const mediaQueryList = window.matchMedia(mediaQuery);

  const subscribeToMediaQuery = (listener: (event: MediaQueryListEvent) => void) => {
    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  };

  const isMatchingMediaQuery = () => mediaQueryList.matches;

  const stateOfMediaQuery = useSyncExternalStore(subscribeToMediaQuery, isMatchingMediaQuery);

  return stateOfMediaQuery;
}
