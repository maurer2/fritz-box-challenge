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
}

export type RootStateInitial = Partial<RootState>;
