import React, { useContext } from 'react';

import { BoxDataContext } from '../DataProvider';

import * as Styles from './UpdateBar.styles';

const UpdateBar = () => {
  const state = useContext(BoxDataContext);

  const {
    isUpdating,
    isValid,
  } = state;

  const shouldShowUpdateBar = isUpdating || !isValid;

  return (
    <Styles.UpdateBar $shouldShowUpdateBar={shouldShowUpdateBar}>
      {isUpdating ? (
        <Styles.Text>Updating!</Styles.Text>
      ) : (
        <Styles.Text>
          {isValid ? (
            <>Data loaded!</>
          ) : (
            <>Error!</>
          )}
        </Styles.Text>
      )}
    </Styles.UpdateBar>
  );
};

export { UpdateBar };
