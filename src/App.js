import React, { Component } from 'react';
import TextComponent from './TextComponent/TextComponent';
import styled from 'styled-components';

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
      showFullNumber: true
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(previousState => ({
      showFullNumber: !previousState.showFullNumber,
    }));
  }

  render() {
    const timeLong = '11.11.1111 - 11:11';
    const timeShort = '11.11.1111';

    return (
      <AppWrapper className="App" onClick={ this.handleClick }>
        <TextComponent text={ this.state.showFullNumber ? timeLong : timeShort } />
      </AppWrapper>
    );
  }
}

export default App;
