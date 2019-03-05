import React, { Component } from 'react';

import { getTimeBetween, getDate, getDateAsIsoDate, getNowDate } from './libs/time';
import { getMappedFields } from './libs/mapper';
import { transformString as splitData, getDashPositonsInString, splitString as splitToArray } from './libs/splitter';
import getData from './libs/modem';
import parseData from './libs/parser';

import mockResponse from './mocks/box-01004.txt';

import App from './App';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isTransitioning: false,
      // url: '/cgi-bin/system_status',
      url: mockResponse,
      boxData: {},
      componentsToShow: ['branding', 'firmware', 'model', 'restarts', 'technology', 'runtime', 'age'],
      currentIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  handleClick() {
    if (this.state.isTransitioning) {
      // return;
    }

    this.setState((previousState) => {
      const { currentIndex, componentsToShow } = previousState;
      const lastIndex = componentsToShow.length - 1;

      return {
        currentIndex: (currentIndex < lastIndex) ? currentIndex + 1 : 0,
        isTransitioning: true,
      };
    });
  }

  handleTransitionEnd = () => {
    this.setState({ isTransitioning: false });
  }

  mapBoxData(boxData, runtime, age) {
    const { componentsToShow } = this.state;

    const mappedEntries = componentsToShow.reduce((total, current) => {
      const entries = total;

      entries[current] = boxData[current] || '';

      return entries;
    }, {});

    mappedEntries.runtime = runtime;
    mappedEntries.age = age;

    return mappedEntries;
  }

  getBoxData() {
    this.setState({ isUpdating: true });

    const fetchedFinally = getData(this.state.url)
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

        this.setState(() => {
          const boxData = this.mapBoxData(mappedValues, runtime, age);

          return {
            boxData,
          };
        });
      })
      .catch((error) => {
        console.log('error', error);

        this.setState(() => ({
          dateLong: 'Error',
          dateProsa: 'Error',
        }));

        Promise.resolve();
      });

    fetchedFinally.then(() => {
      this.setState({ isUpdating: false });
    });
  }

  componentDidMount() {
    this.getBoxData();
  }

  render() {
    const { isUpdating, boxData, currentIndex } = this.state;

    return (
      <App
        isUpdating={ isUpdating }
        boxData={ boxData }
        currentIndex={ currentIndex }
        handleClickEvent={ this.handleClick }
        handleTransitionEnd={ this.handleTransitionEnd }
      />
    );
  }
}

export default AppContainer;
