export interface StringMap {
  [key: string]: string;
}

export interface AppProps {
  theme: any; // SC
  boxData: StringMap;
  isUpdating: boolean;
  isValid: boolean;
  componentsToShow: string[];
}
