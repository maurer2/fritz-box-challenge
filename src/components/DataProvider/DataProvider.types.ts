export type AppMode = {
  DEV: 'dev',
  LIVE: 'live',
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
  [type in ComponentType]: string;
};

export interface RootState {
  boxData: ComponentType[];
  isUpdating: boolean;
  isValid: boolean;
  componentsToShow: string[];
  currentIndex: number;
  prevIndex: number;
  updateCurrentIndex: (number: number) => void;
}

export type RootStateInitial = Partial<RootState>;
export type ComponentTypeInitial = Partial<ComponentTypes>;
