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
  render() {
    const time = '11.11.1111 - 11:11';

    return (
      <AppWrapper className="App">
        <TextComponent text={ time } />
      </AppWrapper>
    );
  }
}

export default App;
