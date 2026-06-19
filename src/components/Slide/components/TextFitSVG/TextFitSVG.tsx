import type { Ref, SVGAttributes } from 'react';

type TextFitSVGProps = {
  ref?: Ref<SVGSVGElement>;
  viewBox: SVGAttributes<SVGSVGElement>['viewBox'];
  text: string;
};

// SVG workaround: https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg
const TextFitSVG = ({ ref, viewBox, text }: TextFitSVGProps) => (
  <svg ref={ref} viewBox={viewBox} fill="currentColor" aria-hidden>
    <text x="0" y="15">
      {text}
    </text>
  </svg>
);

export { TextFitSVG };
