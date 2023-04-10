import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';

import { getTimeBetween, getDate, getDateAsIsoDate, getNowDate } from '../../libs/time';
import { getMappedFields } from '../../libs/mapper';
import {
  transformString as splitData,
  getDashPositionsInString,
  splitString as splitToArray,
} from '../../libs/splitter';
import getData from '../../libs/getData';
import parseData from '../../libs/parser';
import mockResponse from '../../mocks/box-iu7nl.txt';

import * as Types from './DataProvider.types';

const BoxDataContext = React.createContext({} as Types.RootStateInitial);

function mapBoxData(
  componentsToShow: Types.ComponentType[],
  boxData: Types.ComponentTypes,
  runtime: any,
  age: any
): Types.ComponentTypes {
  const mappedEntries = componentsToShow.reduce(
    (total: Types.ComponentTypeInitial, current: Types.ComponentType) => {
      const entries = total;

      entries[current] = boxData[current] || '';

      return entries;
    },
    {} as any
  );

  mappedEntries.runtime = runtime;
  mappedEntries.age = age;

  return mappedEntries;
}

const DataProvider: FC<{}> = ({ children }): JSX.Element => {
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [boxData, setBoxData] = useState<Types.ComponentTypes>({} as Types.ComponentTypes);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);

  const [state, setState] = useState<Types.RootStateInitial | Types.RootState>({});

  const componentsToShow = useMemo((): Types.ComponentType[] => {
    const componentsArray: Types.ComponentType[] = [
      'branding',
      'firmware',
      'model',
      'restarts',
      'technology',
      'runtime',
      'age',
    ];
    return componentsArray;
  }, []);

  const url =
    process.env.REACT_APP_MODE === Types.AppMode.DEV ? mockResponse : '/cgi-bin/system_status';

  const updateIndex = useCallback(
    (newIndex: number): void => {
      setPrevIndex(currentIndex);
      setCurrentIndex(newIndex);
    },
    [currentIndex]
  );

  const getBoxData = useCallback((): void => {
    setIsUpdating(true);

    const fetchedFinally = getData(url)
      .then((data: any) => {
        const parsedTextString = parseData(data);

        const dashPositions = getDashPositionsInString(parsedTextString);
        const splitString = splitData(parsedTextString, dashPositions);
        const splitStringAsArray = splitToArray(splitString);

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
          age
        );

        setBoxData(newBoxData);
        setIsValid(true);
      })
      .catch((error: Error) => {
        setIsValid(false);

        Promise.resolve();
      });

    fetchedFinally.then(() => {
      setIsUpdating(false);
    });
  }, [url, componentsToShow]);

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

  return <BoxDataContext.Provider value={state}>{children}</BoxDataContext.Provider>;
};

export { BoxDataContext, DataProvider };
