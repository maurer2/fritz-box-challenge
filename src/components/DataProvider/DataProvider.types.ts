import { FieldValueMap, Fields } from '../../constants/mappings';

export type RootState = {
  boxData: FieldValueMap;
  isUpdating: boolean;
  isValid: boolean;
  visibleComponents: Fields[];
  currentIndex: number;
  prevIndex: number;
  updateCurrentIndex: (number: number) => void;
} | undefined
