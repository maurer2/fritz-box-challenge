import React, {
  PropsWithChildren, useMemo, createContext, useReducer,
} from 'react';
import type { Reducer } from 'react';

import { useFetchBoxData } from '../../hooks/useFetchBoxData/useFetchBoxData';
import { useGetMappedData } from '../../hooks/useGetMappedData/useGetMappedData';

import { RootState } from './DataProvider.types';

type NavIndices = { currentIndex: number; prevIndex: number };

const visibleComponents: NonNullable<RootState>['visibleComponents'] = [
  'model',
  'branding',
  'firmware',
  'restarts',
  'technology',
  // 'runtime',
  'age',
];
const BoxDataContext = createContext<RootState>(undefined);

const DataProvider = ({ children }: PropsWithChildren) => {
  const {
    data,
    isPending,
    isLoading,
    isSuccess,
  } = useFetchBoxData({ key: 'box-data', url: 'http://fritz.box/cgi-bin/system_status' });
  const mappedBoxData = useGetMappedData(data ?? []);

  const [navIndices, updateNavIndices] = useReducer<Reducer<NavIndices, number>>(
    (oldNavState, newIndex): NavIndices => {
      const prevIndex = oldNavState.currentIndex;
      const currentIndex = newIndex;

      return { currentIndex, prevIndex };
    },
    { currentIndex: 0, prevIndex: 0 },
  );

  const value = useMemo(
    () => ({
      boxData: mappedBoxData,
      isUpdating: isPending || isLoading,
      isValid: isSuccess,
      visibleComponents,
      currentIndex: navIndices.currentIndex,
      prevIndex: navIndices.prevIndex,
      updateCurrentIndex: updateNavIndices,
    }),
    [mappedBoxData, navIndices, isPending, isSuccess, isLoading, updateNavIndices],
  );

  return <BoxDataContext.Provider value={value}>{children}</BoxDataContext.Provider>;
};

export { BoxDataContext, DataProvider };
