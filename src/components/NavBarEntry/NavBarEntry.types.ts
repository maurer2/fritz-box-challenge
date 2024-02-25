export interface NavBarEntryProps {
  index: number;
  entry: string;
  $isActive: boolean;
  handleNavigation: any;
  activeElementRef: React.RefObject<HTMLLIElement>;
  $isFullWidth: boolean;
}

export interface NavBarEntryWrapperStyleProps {
  $isFullWidth: boolean;
}

export interface NavBarButtonStyleProps {
  $isActive: boolean;
}
