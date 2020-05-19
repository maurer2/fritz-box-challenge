import React, { useState, useEffect } from 'react';
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

const BoxDataContext = React.createContext({} as Types.RootState);

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

const DataProvider: React.FC<Types.DataProviderProps> = ({ children }): JSX.Element => {
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [boxData, setBoxData] = useState<Types.BoxData>({} as any);

  const url = process.env.REACT_APP_MODE === 'dev' ? mockResponse : '/cgi-bin/system_status';
  const componentsToShow = [
    'branding',
    'firmware',
    'model',
    'restarts',
    'technology',
    'runtime',
    'age',
  ];

  function getBoxData(): void {
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
        console.log(error);
        setIsValid(false);

        Promise.resolve();
      });

    fetchedFinally.then(() => {
      setIsUpdating(false);
    });
  }

  useEffect(() => {
    getBoxData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(isUpdating, isValid, boxData);
  }, [isUpdating, isValid, boxData]);

  return <BoxDataContext.Provider boxData={boxData}>{children}</BoxDataContext.Provider>;
};

const { node } = PropTypes;

DataProvider.propTypes = {
  children: node.isRequired,
};

export { DataProvider };
