export interface StringMap {
  [key: string]: string;
}

export interface NavBarEntryProps {
  index: number;
  entry: string;
  isActive: boolean;
  handleNavigation: any;
  activeElementRef: React.RefObject<HTMLLIElement>;
  isFullWidth: boolean;
}
