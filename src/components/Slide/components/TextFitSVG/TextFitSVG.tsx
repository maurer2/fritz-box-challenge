import type { Ref, SVGAttributes } from 'react';

type TextFitSVGProps = {
  svgElementRef?: Ref<SVGSVGElement>;
  viewBox: SVGAttributes<SVGSVGElement>['viewBox'];
  text: string;
};

// SVG workaround: https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg
// svgElementRef instead of ref fixes a React Compiler issue
const TextFitSVG = ({ svgElementRef, viewBox, text }: TextFitSVGProps) => (
  <svg ref={svgElementRef} viewBox={viewBox} fill="currentColor" aria-hidden>
    <text x="0" y="15">
      {text}
    </text>
  </svg>
);

export { TextFitSVG };
