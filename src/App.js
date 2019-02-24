import React, { Component } from 'react';
import styled from 'styled-components/macro';

import TextComponent from './TextComponent/TextComponent';
import TimerComponent from './TimerComponent/TimerComponent';
import BoxInformationComponent from './BoxInformationComponent/BoxInformationComponent';

import { getTimeBetween, getDate, getDateAsIsoDate, getNowDate } from './libs/time';
import { getMappedFields } from './libs/mapper';
import { transformString as splitData, getDashPositonsInString, splitString as splitToArray } from './libs/splitter';

import getData from './libs/modem';
import parseData from './libs/parser';

import mockResponse from './mocks/box-01004.txt';

const AppWrapper = styled.div`
  display: flex;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  overflow-y: hidden;
  flex-direction: column;
  background: black;  
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFullNumber: true,
      isUpdating: true,
      loopID: -1,
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

  startUpdateLoop() {
    const loopID = setInterval(() => {
      this.getBoxData().then((data) => {
        console.log('data', data);
      });
    }, 10000);

    this.setState({ loopID });
  }

  cancellUpdateLoop() {
    clearInterval(this.state.loopID);
  }

  componentDidMount() {
    this.getBoxData();
  }

  render() {
    const { dateLong, dateProsa, boxInformation, isUpdating } = this.state;

    return (
      <AppWrapper onClick={ this.handleClick }>
        <TimerComponent isUpdating={ this.state.isUpdating } />
        { !isUpdating && (
          <>
            <TextComponent text={ this.state.showFullNumber ? dateLong : dateProsa } />
          </>
        )}
        <BoxInformationComponent isUpdating={ this.state.isUpdating } list={ boxInformation } />
      </AppWrapper>
    );
  }
}

export default App;
