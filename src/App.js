import React, { Component } from 'react';
import styled from 'styled-components';
import TextComponent from './TextComponent/TextComponent';
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

    this.state = { showFullNumber: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(previousState => ({ showFullNumber: !previousState.showFullNumber }));
  }

  componentDidMount() {
    const url = '/cgi-bin/system_status';
    const data = getData(url);
    data.then((data) => {
      console.log(data);
    });
  }

  render() {
    const nowDate = getNowDate();
    const productionDate = getDateAsIsoDate('112008–002', nowDate);
    const timeProse = getTimeBetween(productionDate, nowDate);
    const timeLong = getDate(productionDate);

    return (
      <AppWrapper className="App" onClick={ this.handleClick }>
        <TextComponent text={ this.state.showFullNumber ? timeLong : timeProse } />
      </AppWrapper>
    );
  }
}

export default App;
