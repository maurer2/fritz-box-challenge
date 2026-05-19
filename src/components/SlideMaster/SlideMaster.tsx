import type { ReactNode } from 'react';

import { SlideMasterWrapper } from './SlideMaster.styles';

type SlideMasterProps = {
  children: ReactNode;
};

const SlideMaster = ({ children }: SlideMasterProps) => (
  <SlideMasterWrapper>{children}</SlideMasterWrapper>
);

export { SlideMaster };
