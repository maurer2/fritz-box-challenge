import React, { Component } from 'react';
import styled from 'styled-components';

const TextWrapper = styled.h1`
  margin: auto;
  font-size: 12vw;
  color: white;
`;

class App extends Component {
  render() {
    return (
      <TextWrapper>
        { this.props.text }
      </TextWrapper>
    );
  }
}

export default App;
