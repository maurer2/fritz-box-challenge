import { VisuallyHidden } from '../../../VisuallyHidden/VisuallyHidden';

import { SlideTextSkeltonBar } from './SlideTextSkelton.styles';

type SlideTextSkeltonProps = {
  label: string;
};

const SlideTextSkelton = ({ label }: SlideTextSkeltonProps) => (
  <>
    <SlideTextSkeltonBar aria-hidden="true" />
    <VisuallyHidden as="output" aria-live="polite" aria-atomic="true">
      Loading {label}
    </VisuallyHidden>
  </>
);

export { SlideTextSkelton };
