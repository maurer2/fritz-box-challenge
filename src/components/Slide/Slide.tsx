import { SlideWrapper, SlideTitle, SlideText } from './Slide.styles';
import { TextFit } from './components/TextFit/TextFit';
import { SlideTextSkeleton } from './components/SlideTextSkeleton/SlideTextSkeleton';

type SlideProps = {
  title: string;
  text?: string;
};

const Slide = ({ title, text }: SlideProps) => {
  const isLoading = text === undefined;

  return (
    <SlideWrapper key={`${title}-${text ?? 'loading'}`}>
      <SlideTitle aria-label={title}>
        <TextFit text={title} />
      </SlideTitle>
      <SlideText aria-label={isLoading ? undefined : text}>
        {isLoading ? <SlideTextSkeleton label={title} /> : <TextFit text={text} />}
      </SlideText>
    </SlideWrapper>
  );
};

export { Slide };
