import React, {
  FC, useState, useEffect, useCallback, PropsWithChildren,
} from 'react';
import { ZodiosError } from '@zodios/core';

import {
  getTimeBetween, getDate, getDateAsIsoDate, getNowDate,
} from '../../libs/time';
import { getMappedFields, getKeyValueMapOfBoxValues } from '../../libs/mapper';
import {
  transformString as splitData,
  getDashPositionsInString,
  splitString as splitToArray,
} from '../../libs/splitter';
import { getValueList } from '../../libs/transform';
import { useFetchBoxData } from '../../hooks/useFetchBoxData/useFetchBoxData';
import { useBoxDataExtractor } from '../../hooks/useBoxDataExtractor/useBoxDataExtractor';
import { useGetMappedData } from '../../hooks/useGetMappedData/useGetMappedData';

import * as Types from './DataProvider.types';

const BoxDataContext = React.createContext({} as Types.RootStateInitial);

function mapBoxData(
  componentsToShow: Types.ComponentType[],
  boxData: Types.ComponentTypes,
  runtime: string,
  age: string,
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

  mappedEntries.runtime = runtime;
  mappedEntries.age = age;

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

type FieldMap = ReturnType<typeof useGetMappedData>;

const DataProvider: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  const [state, setState] = useState<Types.RootStateInitial | Types.RootState>({});
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [boxData, setBoxData] = useState<Types.ComponentTypes>({} as Types.ComponentTypes);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);

  const {
    data: boxDataAsString,
    isPending,
  } = useFetchBoxData({ key: 'box-data', url: 'http://fritz.box/cgi-bin/system_status' });
  const extractedValuesUncategorized: string[] = useBoxDataExtractor(boxDataAsString);
  const extractedValuesMapped: FieldMap = useGetMappedData(extractedValuesUncategorized);

  console.log(extractedValuesMapped);

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

      const mappedValues = getMappedFields(extractedValuesUncategorized);

      const nowDateString = getNowDate();
      const dateIsoString = getDateAsIsoDate(extractedValuesMapped.powerOnHours, nowDateString);

      const runtime = getDate(dateIsoString);
      const age = getTimeBetween(dateIsoString, nowDateString);

      const newBoxData: Types.ComponentTypes = mapBoxData(
        componentsToShow,
        mappedValues,
        runtime,
        age,
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
  }, [boxDataAsString, isPending]);

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
