import React, { PureComponent } from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  padding: 1rem;
  background: red;
`;

const TimerText = styled.span`
  position: relative;
  display: block;
  top: 50%;    
  transform: translateY(-50%);
  text-align: center;
  font-size: 2.5rem;
`;

class TimerComponent extends PureComponent {
  render() {
    return (
      <TimerWrapper>
        <TimerText>
          Updating!
        </TimerText>
      </TimerWrapper>
    );
  }
}

export default TimerComponent;
