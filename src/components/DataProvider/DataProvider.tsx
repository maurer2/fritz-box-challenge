import React, {
  FC, useState, useEffect, useCallback, PropsWithChildren,
} from 'react';
import { ZodiosError } from '@zodios/core';

import { useFetchBoxData } from '../../hooks/useFetchBoxData/useFetchBoxData';
import { useBoxDataExtractor } from '../../hooks/useBoxDataExtractor/useBoxDataExtractor';
import { useGetMappedData } from '../../hooks/useGetMappedData/useGetMappedData';

import * as Types from './DataProvider.types';

const BoxDataContext = React.createContext({} as Types.RootStateInitial);

function mapBoxData(
  componentsToShow: Types.ComponentType[],
  boxData: Types.ComponentTypes,
): Types.ComponentTypes {
  const mappedEntries = componentsToShow.reduce(
    (total: Types.ComponentTypeInitial, current: Types.ComponentType) => {
      const entries = total;

      entries[current] = boxData[current] || '';

      return entries;
    },
    // {} as Record<string, keyof Types.ComponentTypes>,
    {} as Types.ComponentTypes,
  );

  return mappedEntries as Required<Types.ComponentTypes>;
}

const componentsToShow: Types.ComponentType[] = [
  'branding',
  'firmware',
  'model',
  'restarts',
  'technology',
  'runtime',
  'age',
];

const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<Types.RootStateInitial | Types.RootState>({});
  const [isUpdating, setIsUpdating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [boxData, setBoxData] = useState<Types.ComponentTypes>({} as Types.ComponentTypes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const {
    data: boxDataAsString,
    isPending,
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

  const getBoxData = useCallback(async (): Promise<void> => {
    try {
      setIsUpdating(true);

      if (isPending) {
        return;
      }

      const newBoxData: Types.ComponentTypes = mapBoxData(
        componentsToShow,
        extractedValuesMapped,
      );

      setBoxData(newBoxData);
      setIsValid(true);
      setIsUpdating(false);
    } catch (error) {
      if (error instanceof ZodiosError) {
        console.log(error.message);
        // setIsValid(false);
      }

      if (error instanceof Error) {
        console.log(error.message);
        // setIsValid(false);
      }

      setIsValid(false);
      setIsUpdating(false);
    }
  }, [isPending]);

  useEffect(() => {
    getBoxData();
  }, [getBoxData]);

  useEffect(() => {
    setState({
      boxData,
      isUpdating,
      isValid,
      componentsToShow,
      currentIndex,
      prevIndex,
      updateCurrentIndex: updateIndex,
    });
  }, [isUpdating, isValid, boxData, currentIndex, prevIndex, updateIndex]);

  return (
    <BoxDataContext.Provider value={state}>
      {children}
    </BoxDataContext.Provider>
  );
};

export { BoxDataContext, DataProvider };
