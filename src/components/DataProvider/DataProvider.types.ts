export type ComponentType =
  | 'branding'
  | 'firmware'
  | 'model'
  | 'restarts'
  | 'technology'
  | 'runtime'
  | 'age';

export type ComponentTypes = { [type in ComponentType]: string };

export interface BoxData {
  // [ComponentType]: string;
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
