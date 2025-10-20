import React, { type PropsWithChildren } from 'react';

import { SlideMasterWrapper } from './SlideMaster.styles';

type SlideMasterProps = PropsWithChildren;

const SlideMaster = ({ children }: SlideMasterProps) => (
  <SlideMasterWrapper>{children}</SlideMasterWrapper>
);

export { SlideMaster };
