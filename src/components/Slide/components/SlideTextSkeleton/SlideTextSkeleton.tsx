import { VisuallyHidden } from '../../../VisuallyHidden/VisuallyHidden';

import { SlideTextSkeletonBar } from './SlideTextSkeleton.styles';

type SlideTextSkeletonProps = {
  label: string;
};

const SlideTextSkeleton = ({ label }: SlideTextSkeletonProps) => (
  <>
    <SlideTextSkeletonBar aria-hidden="true" />
    <VisuallyHidden as="output" aria-live="polite" aria-atomic="true">
      Loading {label}
    </VisuallyHidden>
  </>
);

export { SlideTextSkeleton };
