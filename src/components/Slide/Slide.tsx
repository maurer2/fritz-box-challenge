import { SlideWrapper, SlideTitle, SlideText } from './Slide.styles';
import { TextFit } from './components/TextFit/TextFit';

type SlideProps = {
  title: string;
  text: string;
};

const Slide = ({ title, text }: SlideProps) => (
  <SlideWrapper key={`${title}-${text}`}>
    <SlideTitle aria-label={title}>
      <TextFit text={title} />
    </SlideTitle>
    <SlideText aria-label={text}>
      <TextFit text={text} />
    </SlideText>
  </SlideWrapper>
);

export { Slide };
