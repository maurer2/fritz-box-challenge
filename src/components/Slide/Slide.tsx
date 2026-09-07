import { match } from 'ts-pattern';

import { SlideTextSkeleton } from './components/SlideTextSkeleton/SlideTextSkeleton';
import { TextFit } from './components/TextFit/TextFit';
import { SlideWrapper, SlideTitle, SlideText } from './Slide.styles';

type SlideProps = { title: string } & (
  | { type: 'loading' }
  | { type: 'unavailable' }
  | { type: 'error' }
  | { type: 'success'; text: string }
);

const Slide = (props: SlideProps) => {
  const { title } = props;

  const key = match(props)
    .with({ type: 'success' }, ({ text }) => `${title}-${text}`)
    .otherwise(({ type: state }) => `${title}-${state}`);
  const slideText = match(props)
    .with({ type: 'loading' }, () => (
      <SlideText>
        <SlideTextSkeleton label={title} />
      </SlideText>
    ))
    .with({ type: 'unavailable' }, () => (
      <SlideText aria-label={`${title} unavailable`}>
        <TextFit text="N/A" />
      </SlideText>
    ))
    .with({ type: 'error' }, () => (
      <SlideText aria-label={`${title} couldn't be loaded`}>
        <TextFit text="N/A" />
      </SlideText>
    ))
    .with({ type: 'success' }, ({ text }) => (
      <SlideText aria-label={text}>
        <TextFit text={text} />
      </SlideText>
    ))
    .exhaustive();

  return (
    <SlideWrapper key={key}>
      <SlideTitle aria-label={title}>
        <TextFit text={title} />
      </SlideTitle>
      {slideText}
    </SlideWrapper>
  );
};

export { Slide };
