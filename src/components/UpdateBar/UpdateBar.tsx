import type { PropsWithChildren } from 'react';

import { UpdateBarWrapper } from './UpdateBar.styles';

type UpdateBarProps = PropsWithChildren;

const UpdateBar = ({ children }: UpdateBarProps) => (
  <UpdateBarWrapper aria-atomic>{children}</UpdateBarWrapper>
);

export { UpdateBar };
