import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const Wrapper = styled.div`
  user-select: none;
  text-align: center;
  will-change: transform;
`;

const TitleWrapper = styled.h1`
  margin-top: 0;
  margin-bottom: 2vh;
  color: white;
  font-size: 5vw;
`;

const TextWrapper = styled.h2`
  margin: 0;
  color: white;
  font-size: ${props => 100 / props.characterCount * 1.5}vw;
  line-height: 1;

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
      <Wrapper>
        <TitleWrapper>
          { upperFirst(this.props.title) }
        </TitleWrapper>
        <TextWrapper characterCount={ this.numberOfCharacters }>
          { this.textSeparate.map(
            (character, index) => (
            <span className="character" key={ index }>
              { character }
            </span>
            ),
          )}
        </TextWrapper>
      </Wrapper>
    );
  }
}

TextComponent.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
};

export default TextComponent;
