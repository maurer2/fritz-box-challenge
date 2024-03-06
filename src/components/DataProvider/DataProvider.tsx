import React, {
  FC, useState, useCallback, PropsWithChildren, useMemo, createContext,
} from 'react';

import { useFetchBoxData } from '../../hooks/useFetchBoxData/useFetchBoxData';
import { useBoxDataExtractor } from '../../hooks/useBoxDataExtractor/useBoxDataExtractor';
import { useGetMappedData } from '../../hooks/useGetMappedData/useGetMappedData';

import { ComponentType, RootStateInitial } from './DataProvider.types';

const BoxDataContext = createContext<RootStateInitial>(null);

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

const componentsToShow: ComponentType[] = [
  'branding',
  'firmware',
  'model',
  'restarts',
  'technology',
  'runtime',
  'age',
];

const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const {
    data: boxDataAsString,
    isPending,
    isSuccess,
  } = useFetchBoxData({ key: 'box-data', url: 'http://fritz.box/cgi-bin/system_status' });
  const extractedValuesUncategorised: string[] = useBoxDataExtractor(boxDataAsString);
  const extractedValuesMapped = useGetMappedData(extractedValuesUncategorised);

  const updateIndex = useCallback(
    (newIndex: number): void => {
      setPrevIndex(currentIndex);
      setCurrentIndex(newIndex);
    },
    [currentIndex],
  );

  // const newBoxData: Types.ComponentTypes = mapBoxData(componentsToShow, extractedValuesMapped);

  const value = useMemo(
    () => ({
      boxData: extractedValuesMapped,
      isUpdating: isPending,
      isValid: isSuccess,
      componentsToShow,
      currentIndex,
      prevIndex,
      updateCurrentIndex: updateIndex,
    }),
    [extractedValuesMapped, currentIndex, isPending, isSuccess, prevIndex, updateIndex],
  );

  return <BoxDataContext.Provider value={value}>{children}</BoxDataContext.Provider>;
};

export { BoxDataContext, DataProvider };
