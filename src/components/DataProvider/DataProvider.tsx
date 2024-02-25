import React, {
  FC, useState, useEffect, useCallback, useMemo, PropsWithChildren,
} from 'react';
import { ZodiosError } from '@zodios/core';

import { apiClient } from '../../api/apiClient';
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
import parseData from '../../libs/parser';

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

const DataProvider: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  const [state, setState] = useState<Types.RootStateInitial | Types.RootState>({});
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [boxData, setBoxData] = useState<Types.ComponentTypes>({} as Types.ComponentTypes);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);

  const componentsToShow = useMemo(
    (): Types.ComponentType[] => ([
      'branding',
      'firmware',
      'model',
      'restarts',
      'technology',
      'runtime',
      'age',
    ]),
    [],
  );

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
      // const htmlString = await apiClient.getBoxData();
      const response = await fetch('http://fritz.box/cgi-bin/system_status');
      if (!response.ok) {
        throw new Error('Response error');
      }

      const htmlString = await response.text();

      const parsedTextString = parseData(htmlString);

      const dashPositions = getDashPositionsInString(parsedTextString);
      const splitString = splitData(parsedTextString, dashPositions);
      const splitStringAsArray = splitToArray(splitString);

      const extractedValuesAsList = getValueList(parsedTextString);
      const extractedValuesMapped = getKeyValueMapOfBoxValues(extractedValuesAsList);
      console.log(extractedValuesMapped);

      const mappedValues = getMappedFields(splitStringAsArray);

      const extractedDateString = `${mappedValues['powerOnHours 1']}-${mappedValues['powerOnHours 2']}`;
      const nowDateString = getNowDate();

      const dateIsoString = getDateAsIsoDate(extractedDateString, nowDateString);

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
  }, [componentsToShow]);

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
  }, [isUpdating, isValid, boxData, currentIndex, prevIndex, componentsToShow, updateIndex]);

  return (
    <BoxDataContext.Provider value={state}>
      {children}
    </BoxDataContext.Provider>
  );
};

export { BoxDataContext, DataProvider };
