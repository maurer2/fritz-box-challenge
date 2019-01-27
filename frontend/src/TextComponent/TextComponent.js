import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

const TextWrapper = styled.h1`
  margin: auto;
  color: white;
  /* color: ${props => props.characterCount === 5 ? "green" : "white"}; */
  /*
  ${props => props.numberOfCharacters === 5 && css`
    background: red; 
  `};
  */

  font-size: ${props => 100 / props.characterCount * 1.5 }vw;
`;

class TextComponent extends PureComponent {
  get textSeparate() {
    return this.props.text.split('');
  }

  get numberOfCharacters() {
    return this.textSeparate.length;
  }

  render() {
    return (
      <TextWrapper characterCount={ this.numberOfCharacters }>
        { this.textSeparate.map(
          (character, index) => 
          <span key={ index } > { character } </span>
          )
        }
      </TextWrapper>
    );
  }
}

export default TextComponent;
