import type { Ref, SVGAttributes } from 'react';

import { TextFitSVG } from '../TextFitSVG/TextFitSVG';
import { TextFitCSS } from './SlideField.styles';

type SlideFieldProps = {
  text: string;
  ref: Ref<SVGSVGElement>;
  viewBox: SVGAttributes<SVGSVGElement>['viewBox'];
};

// https://caniuse.com/mdn-css_properties_text-fit_grow
const isSupportingTextFit = CSS.supports('text-fit', 'grow');

const SlideField = ({ text, ref, viewBox }: SlideFieldProps) =>
  isSupportingTextFit ? (
    <TextFitCSS>{text}</TextFitCSS>
  ) : (
    <TextFitSVG ref={ref} text={text} viewBox={viewBox} />
  );

export { SlideField };
