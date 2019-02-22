import React, { Component } from 'react';
import styled from 'styled-components/macro';
import TextComponent from './TextComponent/TextComponent';
import TimerComponent from './TimerComponent/TimerComponent';
import { getTimeBetween, getDate, getDateAsIsoDate, getNowDate } from './libs/time';
import getData from './libs/modem';
import parseData from './libs/parser';
import { transformString as splitData, getDashPositonsInString } from './libs/splitter';

const AppWrapper = styled.div`
  display: flex;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: black;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFullNumber: true,
      isUpdating: true,
      text: '',
      loopID: -1,
      url: '/cgi-bin/system_status',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(previousState => ({ showFullNumber: !previousState.showFullNumber }));
  }

  fetchDataFromModem() {
    return getData(this.state.url)
      .then((data) => {
        if (data instanceof Error) {
          throw new Error('network error');
        }

        // return Promise.resolve(error);
        return data;
      })
      .catch(error => Promise.reject(error));
  }

  startUpdateLoop() {
    const loopID = setInterval(() => {
      this.fetchDataFromModem().then((data) => {
        console.log('data', data);
      });
    }, 10000);

    this.setState({ loopID });
  }

  cancellUpdateLoop() {
    clearInterval(this.state.loopID);
  }

  componentDidMount() {
    this.setState({ isUpdating: true });

    const fetchedFinally = this.fetchDataFromModem()
      .then((data) => {
        const rawTextString = data;
        const parsedTextString = parseData(rawTextString);

        const dashPositions = getDashPositonsInString(parsedTextString);
        const splitString = splitData(parsedTextString, dashPositions);

        const extractedDateString = splitString.substr(28, 10);
        const nowDateString = getNowDate();

        const dateIsoString = getDateAsIsoDate(extractedDateString, nowDateString);
        const dateReadable = getDate(dateIsoString);
        const dateProsa = getTimeBetween(dateIsoString, nowDateString);

        console.log('extractedDateString', dateReadable, dateProsa);

        Promise.resolve();
      })
      .catch((error) => {
        console.log('error2', error);

        Promise.resolve();
      });

    fetchedFinally.then(() => {
      this.setState({ isUpdating: false });
    });
  }

  getProductionDate() {
    const nowDate = getNowDate();
    const productionDate = getDateAsIsoDate('112008–002', nowDate);

    return productionDate;
  }

  render() {
    const timeProse = getTimeBetween(this.getProductionDate(), getNowDate());
    const timeLong = getDate(this.getProductionDate());

    return (
      <AppWrapper onClick={ this.handleClick }>
        <TextComponent text={ this.state.showFullNumber ? timeLong : timeProse } />
        <TimerComponent isUpdating={ this.state.isUpdating } />
      </AppWrapper>
    );
  }
}

export default App;
