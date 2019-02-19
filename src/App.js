import React, { Component } from 'react';
import styled from 'styled-components/macro';
import TextComponent from './TextComponent/TextComponent';
import TimerComponent from './TimerComponent/TimerComponent';
import { getTimeBetween, getDate, getDateAsIsoDate, getNowDate } from './libs/time';
import getData from './libs/modem';

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
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(previousState => ({ showFullNumber: !previousState.showFullNumber }));
  }

  fetchNewDate() {
    const url = '/cgi-bin/system_status';

    this.setState({ isUpdating: true });

    return getData(url)
      .then((data) => {
        this.setState({
          isUpdating: false,
          text: data,
        });

        return data;
      });
  }

  startUpdateLoop() {
    const loopID = setInterval(() => {
      this.fetchNewDate();
      console.log('update', loopID);
    }, 10000);

    this.setState({ loopID });
  }

  cancellUpdateLoop() {
    clearInterval(this.state.loopID);
  }

  componentDidMount() {
    this.fetchNewDate()
      .then(() => {
        // this.startUpdateLoop();
      });
  }

  render() {
    const nowDate = getNowDate();
    const productionDate = getDateAsIsoDate('112008–002', nowDate);
    const timeProse = getTimeBetween(productionDate, nowDate);
    const timeLong = getDate(productionDate);

    return (
      <AppWrapper onClick={ this.handleClick }>
        <TextComponent text={ this.state.showFullNumber ? timeLong : timeProse } />
        <TimerComponent isUpdating={ this.state.isUpdating } />
      </AppWrapper>
    );
  }
}

export default App;
