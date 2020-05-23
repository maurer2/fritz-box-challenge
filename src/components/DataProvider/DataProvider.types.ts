export interface StringMap {
  [key: string]: string;
}

export interface DataProviderProps {}

export interface BoxData {
  branding: string;
  firmware: string;
  model: string;
  restarts: string;
  technology: string;
  runtime: string;
  age: string;
}

export interface RootState {
  boxData: BoxData;
  isUpdating: boolean;
  isValid: boolean;
  componentsToShow: string[];
  currentIndex: number;
  updateCurrentIndex: (number: number) => void;
}

export type RootStateInitial = Partial<RootState>;
