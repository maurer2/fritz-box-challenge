import { useContext } from 'react';

import { BoxDataContext } from '../../components/DataProvider/DataProvider';
import { RootState } from '../../components/DataProvider/DataProvider.types';

type RootStateBase = Pick<NonNullable<RootState>, 'visibleComponents' | 'currentIndex' | 'prevIndex' | 'updateCurrentIndex'>

interface RootStateLoading extends RootStateBase {
  _state: 'loading';

  boxData: null;
  isUpdating: true;
  isError: false;
}

interface RootStateSuccess extends RootStateBase {
  _state: 'success';

  boxData: NonNullable<RootState>['boxData'];
  isUpdating: false;
  isError: false;
}

interface RootStateError extends RootStateBase {
  _state: 'error';

  boxData: null;
  isUpdating: false;
  isError: true;
  errorData: string;
}

export default function useBoxDataContext() {
  const boxDataContext = useContext(BoxDataContext);

  if (!boxDataContext || (!boxDataContext.isValid && !boxDataContext?.isUpdating)) {
    return {
      _state: 'error',
      boxData: null,
      isUpdating: false,
      isError: true,
      errorData: 'Error',
      currentIndex: 0,
      prevIndex: -1,
      updateCurrentIndex: () => null,
      visibleComponents: [],
    } satisfies RootStateError;
  }

  if (boxDataContext.isValid) {
    return {
      ...boxDataContext,

      _state: 'success',
      isUpdating: false,
      isError: false,
    } satisfies RootStateSuccess;
  }

  return {
    ...boxDataContext,

    _state: 'loading',
    boxData: null,
    isUpdating: true,
    isError: false,
  } satisfies RootStateLoading;
}
