import React from 'react';
import PropTypes from 'prop-types';
import { upperFirst } from 'lodash';

import * as Styles from './Slide.styles';
import * as Types from './Slide.types';

const Slide: React.FC<Types.SlideProps> = ({ title, text }): JSX.Element => (
  <Styles.Wrapper>
    <Styles.TitleWrapper>{upperFirst(title)}</Styles.TitleWrapper>
    <Styles.TextWrapper characterCount={text.length}>
      {text.split('').map((character, index) => (
        <span className="character" key={index}>
          {index === 0 ? upperFirst(character) : character}
        </span>
      ))}
    </Styles.TextWrapper>
  </Styles.Wrapper>
);

const { string } = PropTypes;

Slide.propTypes = {
  text: string.isRequired,
  title: string.isRequired,
};

export { Slide };
