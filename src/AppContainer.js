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
      showFullNumber: true,
      isUpdating: true,
      // url: '/cgi-bin/system_status',
      url: mockResponse,
      dateLong: '',
      dateProsa: '',
      boxInformation: {},
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(previousState => ({ showFullNumber: !previousState.showFullNumber }));
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

        this.setState(() => ({
          dateLong,
          dateProsa,
          boxInformation: mappedValues,
        }));

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
    const { showFullNumber, isUpdating, dateLong, dateProsa, boxInformation } = this.state;
    return (
      <App
        onClick={ this.handleClick }
        showFullNumber={ showFullNumber }
        isUpdating={ isUpdating }
        dateLong={ dateLong }
        dateProsa={ dateProsa }
        boxInformation={ boxInformation }
        handleClickEvent= { this.handleClick }
      />
    );
  }
}

export default AppContainer;
