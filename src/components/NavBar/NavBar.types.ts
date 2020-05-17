export interface StringMap {
  [key: string]: string;
}

export interface NavBarProps {
  componentsToShow: any[];
  currentIndex: number;
  handleNavigation: any;
  isUpdating: boolean;
}
