import { useState, type SVGAttributes, type Ref } from 'react';
import type { Simplify } from 'type-fest';

import { SlideWrapper, SlideTitle, SlideText, TextFit } from './Slide.styles';

type SlideProps = {
  title: string;
  text: string;
};
type ViewBoxName = Simplify<keyof SlideProps>;
type ViewBoxes = Record<ViewBoxName, string | undefined>;
type ViewBoxString = SVGAttributes<SVGSVGElement>['viewBox'];
type TextReplacementElementProps = {
  svgElementRef?: Ref<SVGSVGElement>;
  viewBox: ViewBoxString;
  text: string;
};

// svgElementRef instead of ref fixes compiler issue
const TextReplacementElement = ({ svgElementRef, viewBox, text }: TextReplacementElementProps) => (
  <svg ref={svgElementRef} viewBox={viewBox} fill="currentColor" aria-hidden>
    <text x="0" y="15">
      {text}
    </text>
  </svg>
);

// Uses SVG workaround: https://css-tricks.com/fitting-text-to-a-container/#aa-just-use-svg
const Slide = ({ title, text }: SlideProps) => {
  const [viewBoxes, setViewBoxes] = useState<ViewBoxes>({
    title: undefined,
    text: undefined,
  });

  const svgElementRefsCallback =
    (viewBoxName: ViewBoxName) => (svgElement: SVGSVGElement | null) => {
      const svgElementBoundingBox = svgElement?.getBBox() ?? null;
      if (!svgElementBoundingBox) {
        return;
      }

      const newViewBoxString: ViewBoxString = [
        svgElementBoundingBox.x,
        svgElementBoundingBox.y,
        svgElementBoundingBox.width,
        svgElementBoundingBox.height,
      ].join(' ');

      setViewBoxes((previousViewBoxes) => {
        const previousViewBoxString = previousViewBoxes[viewBoxName];

        if (previousViewBoxString === newViewBoxString) {
          return previousViewBoxes;
        }

        return { ...previousViewBoxes, [viewBoxName]: newViewBoxString };
      });
    };

  const svgElementRefs = {
    title: svgElementRefsCallback('title'),
    text: svgElementRefsCallback('text'),
  } satisfies Partial<Record<ViewBoxName, ReturnType<typeof svgElementRefsCallback>>>;

  // "experimental-web-platform-features"-flag needs to be set
  const isSupportingTextGrow = CSS.supports('text-grow', 'per-line scale');

  return (
    <SlideWrapper key={`${title}-${text}`}>
      <SlideTitle aria-label={title}>
        {isSupportingTextGrow ? (
          <TextFit>{title}</TextFit>
        ) : (
          <TextReplacementElement
            svgElementRef={svgElementRefs.title}
            text={title}
            viewBox={viewBoxes.title}
          />
        )}
      </SlideTitle>
      <SlideText aria-label={text}>
        {isSupportingTextGrow ? (
          <TextFit>{text}</TextFit>
        ) : (
          <TextReplacementElement
            svgElementRef={svgElementRefs.text}
            text={text}
            viewBox={viewBoxes.text}
          />
        )}
      </SlideText>
    </SlideWrapper>
  );
};

export { Slide };
