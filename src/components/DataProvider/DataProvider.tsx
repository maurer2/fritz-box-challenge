import React, {
  PropsWithChildren, useMemo, createContext, useReducer,
} from 'react';
import type { Reducer } from 'react';

import { useFetchBoxData } from '../../hooks/useFetchBoxData/useFetchBoxData';
import { useGetMappedData } from '../../hooks/useGetMappedData/useGetMappedData';

import { ComponentType, RootStateInitial } from './DataProvider.types';

// function mapBoxData(
//   componentsToShow: Types.ComponentType[],
//   boxData: Types.ComponentTypes,
// ): Types.ComponentTypes {
//   const mappedEntries = componentsToShow.reduce(
//     (total: Types.ComponentTypeInitial, current: Types.ComponentType) => {
//       const entries = total;

//       entries[current] = boxData[current] || '';

//       return entries;
//     },
//     // {} as Record<string, keyof Types.ComponentTypes>,
//     {} as Types.ComponentTypes,
//   );

//   return mappedEntries as Required<Types.ComponentTypes>;
// }

type NavIndices = { currentIndex: number; prevIndex: number };

const componentsToShow: ComponentType[] = [
  'branding',
  'firmware',
  'model',
  'restarts',
  'technology',
  'runtime',
  'age',
];

const BoxDataContext = createContext<RootStateInitial>(null);

const DataProvider = ({ children }: PropsWithChildren) => {
  const {
    data: boxData,
    isPending,
    isSuccess,
  } = useFetchBoxData({ key: 'box-data', url: 'http://fritz.box/cgi-bin/system_status' });
  const extractedValuesMapped = useGetMappedData(boxData ?? []);

  const [navIndices, updateIndices] = useReducer<Reducer<NavIndices, number>>(
    (oldIndices, newIndex): NavIndices => {
      const prevIndex = oldIndices.currentIndex;
      const currentIndex = newIndex;

      return { currentIndex, prevIndex };
    },
    { currentIndex: 0, prevIndex: 0 },
  );

  // const newBoxData: Types.ComponentTypes = mapBoxData(componentsToShow, extractedValuesMapped);

  const value = useMemo(
    () => ({
      boxData: extractedValuesMapped,
      isUpdating: isPending,
      isValid: isSuccess,
      componentsToShow,
      currentIndex: navIndices.currentIndex,
      prevIndex: navIndices.prevIndex,
      updateCurrentIndex: updateIndices,
    }),
    [extractedValuesMapped, navIndices, isPending, isSuccess, updateIndices],
  );

  return <BoxDataContext.Provider value={value}>{children}</BoxDataContext.Provider>;
};

export { BoxDataContext, DataProvider };
