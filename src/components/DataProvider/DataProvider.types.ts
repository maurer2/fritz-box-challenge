// eslint-disable-next-line no-shadow
export enum AppMode {
  DEV = 'dev',
  LIVE = 'live',
}

export type ComponentType =
  | 'branding'
  | 'firmware'
  | 'model'
  | 'restarts'
  | 'technology'
  | 'runtime'
  | 'age';

export type ComponentTypes = {
  // [K in ComponentType]: string;
  'branding': string;
  'firmware': string;
  'model': string;
  'restarts': string;
  'technology': string;
  'runtime': string;
  'age': string;
};

export interface RootState {
  boxData: ComponentTypes;
  isUpdating: boolean;
  isValid: boolean;
  componentsToShow: string[];
  currentIndex: number;
  prevIndex: number;
  updateCurrentIndex: (number: number) => void;
}

export type RootStateInitial = Partial<RootState>;
export type ComponentTypeInitial = Partial<ComponentTypes>;
