import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';

import {
  getTimeBetween, getDate, getDateAsIsoDate, getNowDate,
} from '../../libs/time';
import { getMappedFields } from '../../libs/mapper';
import {
  transformString as splitData,
  getDashPositionsInString,
  splitString as splitToArray,
} from '../../libs/splitter';
import getData from '../../libs/modem';
import parseData from '../../libs/parser';
import mockResponse from '../../mocks/box-iu7nl.txt';

import * as Types from './DataProvider.types';

const BoxDataContext = React.createContext({} as Types.RootStateInitial);

function mapBoxData(componentsToShow: any, boxData: any, runtime: any, age: any): Types.BoxData {
  const mappedEntries = componentsToShow.reduce((total: any, current: any) => {
    const entries = total;

    entries[current] = boxData[current] || '';

    return entries;
  }, {} as any);

  mappedEntries.runtime = runtime;
  mappedEntries.age = age;

  return mappedEntries;
}

const DataProvider: React.FC<{}> = ({ children }): JSX.Element => {
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [boxData, setBoxData] = useState<Types.ComponentTypes>({} as any);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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

  const url = process.env.REACT_APP_MODE === Types.AppMode.DEV ? mockResponse : '/cgi-bin/system_status';

  const handleActiveIndex = (newActiveIndex: number) => setCurrentIndex(() => newActiveIndex);

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

        const newBoxData: Types.BoxData = mapBoxData(componentsToShow, mappedValues, runtime, age);

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
      updateCurrentIndex: handleActiveIndex,
    });
  }, [isUpdating, isValid, boxData, currentIndex, componentsToShow]);

  return <BoxDataContext.Provider value={state}>{children}</BoxDataContext.Provider>;
};

const { node } = PropTypes;

DataProvider.propTypes = {
  children: node.isRequired,
};

export { BoxDataContext, DataProvider };
