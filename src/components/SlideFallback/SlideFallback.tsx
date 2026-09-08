import type { ComponentProps } from 'react';
import { useMatch } from '@tanstack/react-router';

import { Slide } from '#components/Slide/Slide';

type SlideProps = ComponentProps<typeof Slide>['type'];
type SlideFallbackProps = {
  type: Extract<SlideProps, 'loading' | 'error'>;
};

// Helper component that injects the title from the route context
const SlideFallback = ({ type }: SlideFallbackProps) => {
  const title = useMatch({ strict: false, select: (match) => match.staticData.title });

  return (
    <Slide
      type={type}
      title={title}
    />
  );
};

export { SlideFallback };
