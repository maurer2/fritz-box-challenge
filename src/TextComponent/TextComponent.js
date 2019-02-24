import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';

const TextWrapper = styled.h1`
  margin: auto;
  color: white;
  user-select: none;
  font-size: ${props => 100 / props.characterCount * 1.75}vw;

  /* color: ${props => (props.characterCount === 5 ? 'green' : 'white')}; */
  /*
  ${props => props.numberOfCharacters === 5 && css`
    background: red; 
  `};
  */
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
          (character, index) => (
          <span key={ index }>
            { character }
          </span>
          ),
        )}
      </TextWrapper>
    );
  }
}

TextComponent.propTypes = { text: PropTypes.string };

export default TextComponent;
