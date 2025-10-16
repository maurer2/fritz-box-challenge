import React, { type PropsWithChildren, type ComponentProps } from 'react';
import type { LinkProps } from '@tanstack/react-router';

import * as Styles from './NavBarEntry.styles';

export type NavBarEntryProps = ComponentProps<'a'> &
  LinkProps &
  PropsWithChildren & {
    // activeElementRef: Ref<HTMLLIElement> | null;
  };

const NavBarEntry = ({ children, ...props }: NavBarEntryProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Styles.NavBarEntry {...props}>{children}</Styles.NavBarEntry>
);

export { NavBarEntry };
