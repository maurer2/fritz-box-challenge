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
      // url: '/cgi-bin/system_status',
      url: mockResponse,
      boxInformation: {},
      componentsToShow: ['branding', 'firmware', 'model', 'restarts', 'technology', 'runtime', 'age'],
      currentComponentIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((previousState) => {
      const { currentComponentIndex, componentsToShow } = previousState;
      const lastIndex = componentsToShow.length - 1;

      return {
        currentComponentIndex: (currentComponentIndex < lastIndex) ? currentComponentIndex + 1 : 0,
      };
    });
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
        const dateLong = getDate(dateIsoString);
        const dateProsa = getTimeBetween(dateIsoString, nowDateString);

        this.setState(() => {
          const boxInformation = Object.assign({}, mappedValues);

          boxInformation.runtime = dateLong;
          boxInformation.age = dateProsa;

          return {
            boxInformation,
          };
        });

        Promise.resolve();
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
    const { isUpdating, boxInformation, componentsToShow, currentComponentIndex } = this.state;

    return (
      <App
        isUpdating={ isUpdating }
        boxInformation={ boxInformation }
        componentsToShow={ componentsToShow }
        currentComponentIndex={ currentComponentIndex }
        handleClickEvent= { this.handleClick }
      />
    );
  }
}

export default AppContainer;
