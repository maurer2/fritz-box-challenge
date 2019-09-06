import React, { useState, useEffect } from 'react';

import { getTimeBetween, getDate, getDateAsIsoDate, getNowDate } from '../../libs/time';
import { getMappedFields } from '../../libs/mapper';
import { transformString as splitData, getDashPositonsInString, splitString as splitToArray } from '../../libs/splitter';
import getData from '../../libs/modem';
import parseData from '../../libs/parser';

import mockResponse from '../../mocks/box-iu7nl.txt';

import { App } from '../App';

function mapBoxData(componentsToShow, boxData, runtime, age) {
  const mappedEntries = componentsToShow.reduce((total, current) => {
    const entries = total;

    entries[current] = boxData[current] || '';

    return entries;
  }, {});

  mappedEntries.runtime = runtime;
  mappedEntries.age = age;

  return mappedEntries;
}

const AppContainer = () => {
  const [isUpdating, setIsUpdating] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [boxData, setBoxData] = useState({});

  const url = (process.env.REACT_APP_MODE === 'dev') ? mockResponse : '/cgi-bin/system_status';
  const componentsToShow = ['branding', 'firmware', 'model', 'restarts', 'technology', 'runtime', 'age'];

  useEffect(() => {
    getBoxData();
  }, []);

  function getBoxData() {
    setIsUpdating(true);

    const fetchedFinally = getData(url)
      .then((data) => {
        const parsedTextString = parseData(data);

        const dashPositions = getDashPositonsInString(parsedTextString);
        const splitString = splitData(parsedTextString, dashPositions);
        const splitStringAsArray = splitToArray(splitString);

        const mappedValues = getMappedFields(splitStringAsArray);

        const extractedDateString = `${mappedValues['powerOnHours 1']}-${mappedValues['powerOnHours 2']}`;
        const nowDateString = getNowDate();

        const dateIsoString = getDateAsIsoDate(extractedDateString, nowDateString);
        const runtime = getDate(dateIsoString);
        const age = getTimeBetween(dateIsoString, nowDateString);

        const newBoxData = mapBoxData(componentsToShow, mappedValues, runtime, age);

        setBoxData(newBoxData);
        setIsValid(true);
      })
      .catch(() => {
        setIsValid(false);

        Promise.resolve();
      });

    fetchedFinally.then(() => {
      setIsUpdating(false);
    });
  }

  return (
    <App
      isUpdating={ isUpdating }
      isValid={ isValid }
      boxData={ boxData }
      componentsToShow= { componentsToShow}
    />
  );
};

export { AppContainer };
