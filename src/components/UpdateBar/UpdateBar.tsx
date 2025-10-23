import type { PropsWithChildren } from 'react';

import { UpdateBarWrapper } from './UpdateBar.styles';

type UpdateBarProps = PropsWithChildren;

const UpdateBar = ({ children }: UpdateBarProps) => (
  <UpdateBarWrapper role="status" aria-atomic>
    {children}
  </UpdateBarWrapper>
);

export { UpdateBar };
