import { useState, type SVGAttributes } from 'react';
import type { Simplify } from 'type-fest';

import { SlideWrapper, SlideTitle, SlideText } from './Slide.styles';
import { SlideField } from './components/SlideField/SlideField';

type SlideProps = {
  title: string;
  text: string;
};
type ViewBoxName = Simplify<keyof SlideProps>;
type ViewBoxes = Record<ViewBoxName, string | undefined>;
type ViewBoxString = SVGAttributes<SVGSVGElement>['viewBox'];

const Slide = ({ title, text }: SlideProps) => {
  const [viewBoxes, setViewBoxes] = useState<ViewBoxes>({
    title: undefined,
    text: undefined,
  });

  const svgElementRefCallback =
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

  return (
    <SlideWrapper key={`${title}-${text}`}>
      <SlideTitle aria-label={title}>
        <SlideField text={title} ref={svgElementRefCallback('title')} viewBox={viewBoxes.title} />
      </SlideTitle>
      <SlideText aria-label={text}>
        <SlideField text={text} ref={svgElementRefCallback('text')} viewBox={viewBoxes.text} />
      </SlideText>
    </SlideWrapper>
  );
};

export { Slide };
