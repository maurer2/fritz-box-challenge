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
      isValid: true,
      url: (process.env.REACT_APP_MODE === 'dev') ? mockResponse : '/cgi-bin/system_status',
      boxData: {},
      componentsToShow: ['branding', 'firmware', 'model', 'restarts', 'technology', 'runtime', 'age'],
      currentIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleClick() {
    this.setState((previousState) => {
      const { currentIndex, componentsToShow } = previousState;
      const lastIndex = componentsToShow.length - 1;

      return {
        currentIndex: (currentIndex < lastIndex) ? currentIndex + 1 : 0,
      };
    });
  }

  handleNavigation(index) {
    this.setState({ currentIndex: index });
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
            isUpdating: false,
            isValid: true,
          };
        });
      })
      .catch(() => {
        this.setState({ isValid: false });

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
    const { isUpdating, boxData, currentIndex, isValid } = this.state;

    return (
      <App
        isUpdating={ isUpdating }
        isValid={ isValid }
        boxData={ boxData }
        currentIndex={ currentIndex }
        handleClickEvent={ this.handleClick }
        handleNavigation={ this.handleNavigation }
      />
    );
  }
}

export default AppContainer;
