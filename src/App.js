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
      loopID: -1,
      url: '/cgi-bin/system_status',
      dateLong: '',
      dateProsa: '',
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
        const dateLong = getDate(dateIsoString);
        const dateProsa = getTimeBetween(dateIsoString, nowDateString);

        this.setState(() => ({
          dateLong,
          dateProsa,
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

  render() {
    const { dateLong, dateProsa } = this.state;

    return (
      <AppWrapper onClick={ this.handleClick }>
        <TimerComponent isUpdating={ this.state.isUpdating } />
        <TextComponent text={ this.state.showFullNumber ? dateLong : dateProsa } />
      </AppWrapper>
    );
  }
}

export default App;
