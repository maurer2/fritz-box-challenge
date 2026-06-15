import type { Ref, SVGAttributes } from 'react';

import { TextFitSVG } from '../TextFitSVG/TextFitSVG';
import { TextFitCSS } from './SlideField.styles';

type SlideFieldProps = {
  text: string;
  svgRef: Ref<SVGSVGElement>;
  viewBox: SVGAttributes<SVGSVGElement>['viewBox'];
};

// "experimental-web-platform-features"-flag needs to be set
const isSupportingTextGrow = CSS.supports('text-grow', 'per-line scale');

const SlideField = ({ text, svgRef, viewBox }: SlideFieldProps) =>
  isSupportingTextGrow ? (
    <TextFitCSS>{text}</TextFitCSS>
  ) : (
    <TextFitSVG svgElementRef={svgRef} text={text} viewBox={viewBox} />
  );

export { SlideField };
