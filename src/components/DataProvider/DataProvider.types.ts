import { FieldMap, Fields } from '../../constants/mappings';

// export type ComponentType =
//   | 'branding'
//   | 'firmware'
//   | 'model'
//   | 'restarts'
//   | 'technology'
//   | 'runtime'
//   | 'age'
//   | 'powerOnHours';

// export type ComponentTypes = {
//   [type in ComponentType]: string;
// };

// interface RootStateDefault {
//   visibleComponents: string[];
//   currentIndex: number;
//   prevIndex: number;
//   updateCurrentIndex: (number: number) => void;
// }

// interface RootStateLoading extends RootStateDefault {
//   _state: 'loading';

//   boxData: null;
//   isUpdating: true;
//   isError: false;
// }

// export interface RootStateSuccess extends RootStateDefault {
//   _state: 'success';

//   boxData: FieldMap;
//   isUpdating: false;
//   isError: false;
// }

// export interface RootStateError extends RootStateDefault {
//   _state: 'error';

//   boxData: null;
//   isUpdating: false;
//   isError: true;
//   errorData: string;
// }

export interface RootState {
  boxData: FieldMap | null;
  isUpdating: boolean;
  isValid: boolean;
  visibleComponents: Fields[];
  currentIndex: number;
  prevIndex: number;
  updateCurrentIndex: (number: number) => void;
}

// export type RootState = RootStateLoading | RootStateSuccess | RootStateError;

// export type ComponentTypeInitial = Partial<ComponentTypes>;
