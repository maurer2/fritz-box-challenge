import React, {
  PropsWithChildren, useMemo, createContext, useReducer,
} from 'react';
import type { Reducer } from 'react';

import { useFetchBoxData } from '../../hooks/useFetchBoxData/useFetchBoxData';
import { useGetMappedData } from '../../hooks/useGetMappedData/useGetMappedData';

import { RootState } from './DataProvider.types';

type NavIndices = { currentIndex: number; prevIndex: number };

const visibleComponents: RootState['visibleComponents'] = [
  'branding',
  'firmware',
  'model',
  'restarts',
  'technology',
  'runtime',
  'age',
];
const BoxDataContext = createContext<RootState>(null);

const DataProvider = ({ children }: PropsWithChildren) => {
  const {
    data,
    isPending,
    isLoading,
    isSuccess,
    isError,
  } = useFetchBoxData({ key: 'box-data', url: 'http://fritz.box/cgi-bin/system_status' });
  const extractedValuesMapped = useGetMappedData(data ?? []);

  const [navIndices, updateIndices] = useReducer<Reducer<NavIndices, number>>(
    (oldIndices, newIndex): NavIndices => {
      const prevIndex = oldIndices.currentIndex;
      const currentIndex = newIndex;

      return { currentIndex, prevIndex };
    },
    { currentIndex: 0, prevIndex: 0 },
  );

  const value = useMemo(() => ({
      boxData: isPending || isLoading || isError ? null : extractedValuesMapped, // todo add descriminated union
      isUpdating: isPending || isLoading,
      isValid: isSuccess,
      visibleComponents,
      currentIndex: navIndices.currentIndex,
      prevIndex: navIndices.prevIndex,
      updateCurrentIndex: updateIndices,
    }),
    [extractedValuesMapped, navIndices, isPending, isSuccess, updateIndices, isLoading],
  );

  return <BoxDataContext.Provider value={value}>{children}</BoxDataContext.Provider>;
};

export { BoxDataContext, DataProvider };
