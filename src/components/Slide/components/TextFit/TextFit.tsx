import { TextFitFallback } from '#components/Slide/components/TextFitFallback/TextFitFallback';

import { TextFitCSS } from './TextFit.styles';

type TextFitProps = {
  text: string;
};

// https://caniuse.com/mdn-css_properties_text-fit_grow
const isSupportingTextFit = CSS.supports('text-fit', 'grow');

const TextFit = ({ text }: TextFitProps) =>
  isSupportingTextFit ? <TextFitCSS>{text}</TextFitCSS> : <TextFitFallback text={text} />;

export { TextFit };
