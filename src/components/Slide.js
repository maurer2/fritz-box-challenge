import React from 'react';
import styled, { css } from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const Wrapper = styled.div`
  user-select: none;
  text-align: center;
  will-change: transform;
`;

const TitleWrapper = styled.h2`
  margin-top: 0;
  margin-bottom: 2vh;
  color: white;
  font-size: 5vw;
`;

const TextWrapper = styled.div`
  margin: 0;
  color: white;
  font-size: ${props => 100 / props.characterCount * 1.35}vw;
  line-height: 1;
  font-weight: bold;

  /* color: ${props => (props.characterCount === 5 ? 'green' : 'white')}; */
  /*
  ${props => props.numberOfCharacters === 5 && css`
    background: red;
  `};
  */
`;

const TextComponent = (props) => {
  const { title, text } = props;

  return (
    <Wrapper>
      <TitleWrapper>
        { upperFirst(title) }
      </TitleWrapper>
      <TextWrapper characterCount={ text.length }>
        {text.split('').map((character, index) => (
          <span className="character" key={ index }>
            { (index === 0) ? upperFirst(character) : character }
          </span>
        ))}
      </TextWrapper>
    </Wrapper>
  );
};

TextComponent.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
};

export default TextComponent;
