import { useSyncExternalStore } from 'react';

type UseMediaQueryProps = {
  mediaQuery: string;
  onChange?: (isMatching: MediaQueryList['matches']) => void;
};

export function useMediaQuery({ mediaQuery, onChange }: UseMediaQueryProps): boolean {
  const mediaQueryList = window.matchMedia(mediaQuery);

  const subscribeToMediaQuery = (onStoreChange: () => void) => {
    // oxlint-disable-next-line typescript/explicit-function-return-type
    const listener = (event: MediaQueryListEvent) => {
      onStoreChange();
      onChange?.(event.matches);
    };

    mediaQueryList.addEventListener('change', listener);
    onChange?.(mediaQueryList.matches);

    // oxlint-disable-next-line typescript/explicit-function-return-type
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  };
  const isMatchingMediaQuery = (): boolean => mediaQueryList.matches;

  return useSyncExternalStore(subscribeToMediaQuery, isMatchingMediaQuery);
}
