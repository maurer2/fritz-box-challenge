import { MutableRefObject } from 'react';

export interface NavBarStyleProps {
  reservedSpaceTop: number;
  isUpdating: boolean;
}

export interface IndicatorStyleProps {
  offset: number;
  width: string; // todo change to number
  height: number;
}

export interface NavBarListStyleProps {
  isRow: MutableRefObject<boolean>;
}
