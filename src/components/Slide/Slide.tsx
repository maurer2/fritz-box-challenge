// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { FC } from 'react';
import { upperFirst } from 'lodash';

import * as Styles from './Slide.styles';
import * as Types from './Slide.types';

const Slide: FC<Types.SlideProps> = ({ title, text }) => (
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
