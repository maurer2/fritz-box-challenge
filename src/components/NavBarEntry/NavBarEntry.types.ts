import { type Ref } from 'react';
// import type Ref from 'react'; // doesn't work

export interface NavBarEntryProps {
  index: number;
  entry: string;
  $isActive: boolean;
  handleNavigation: (index: number) => void;
  activeElementRef: Ref<HTMLLIElement> | null;
  $isFullWidth: boolean;
}

export interface NavBarEntryWrapperStyleProps {
  $isFullWidth: boolean;
}

export interface NavBarButtonStyleProps {
  $isActive: boolean;
}
