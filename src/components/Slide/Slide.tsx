import React from 'react';
import { upperFirst } from 'lodash';

import * as Styles from './Slide.styles';
import type { SlideProps } from './Slide.types';

const Slide = ({ title, text }: SlideProps) => (
  <Styles.Wrapper>
    <Styles.TitleWrapper>{upperFirst(title)}</Styles.TitleWrapper>
    <Styles.TextWrapper $characterCount={text.length}>
      {text.split('').map((character, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span className="character" key={index}>
          {index === 0 ? upperFirst(character) : character}
        </span>
      ))}
    </Styles.TextWrapper>
  </Styles.Wrapper>
);

export { Slide };
