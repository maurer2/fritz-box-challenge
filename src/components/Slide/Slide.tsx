import React from 'react';

import * as Styles from './Slide.styles';

type SlideProps = {
  title: string;
  text: string;
};

const Slide = ({ title, text }: SlideProps) => (
  <Styles.Wrapper>
    <Styles.Title>{title}</Styles.Title>
    {/* workaround for single letter values */}
    <Styles.Value $characterCount={Math.max(text.length, 4)}>{text}</Styles.Value>
  </Styles.Wrapper>
);

export { Slide };
