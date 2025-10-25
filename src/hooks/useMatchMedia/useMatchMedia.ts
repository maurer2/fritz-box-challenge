import { useSyncExternalStore } from 'react';

type UseMediaQueryProps = {
  mediaQuery: string;
  onChange?: (isMatching: MediaQueryList['matches']) => void;
};

export function useMediaQuery({ mediaQuery, onChange }: UseMediaQueryProps): boolean {
  const mediaQueryList = window.matchMedia(mediaQuery);

  const subscribeToMediaQuery = (onStoreChange: () => void) => {
    const listener = (event: MediaQueryListEvent) => {
      onStoreChange();
      onChange?.(event.matches);
    };

    mediaQueryList.addEventListener('change', listener);
    onChange?.(mediaQueryList.matches);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  };

  const isMatchingMediaQuery = () => mediaQueryList.matches;

  return useSyncExternalStore(subscribeToMediaQuery, isMatchingMediaQuery);
}
