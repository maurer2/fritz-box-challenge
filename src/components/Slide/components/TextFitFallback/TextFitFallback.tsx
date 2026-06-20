import { useState, type SVGAttributes } from 'react';

type TextFitFallbackProps = {
  text: string;
};
type ViewBox = SVGAttributes<SVGSVGElement>['viewBox'];

// SVG workaround: https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg
const TextFitFallback = ({ text }: TextFitFallbackProps) => {
  const [viewBox, setViewBox] = useState<ViewBox>();

  const ref = (svgElement: SVGSVGElement | null) => {
    const svgElementBoundingBox = svgElement?.getBBox() ?? null;
    if (!svgElementBoundingBox) {
      return;
    }

    const newViewBox: ViewBox = [
      svgElementBoundingBox.x,
      svgElementBoundingBox.y,
      svgElementBoundingBox.width,
      svgElementBoundingBox.height,
    ].join(' ');

    setViewBox((previousViewBox) =>
      previousViewBox === newViewBox ? previousViewBox : newViewBox,
    );
  };

  return (
    <svg ref={ref} viewBox={viewBox} fill="currentColor" aria-hidden>
      <text x="0" y="15">
        {text}
      </text>
    </svg>
  );
};

export { TextFitFallback };
