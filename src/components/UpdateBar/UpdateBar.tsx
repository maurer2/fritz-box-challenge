import React from 'react';

import useBoxDataContext from '../../hooks/useBoxDataContext/useBoxDataContext';

import * as Styles from './UpdateBar.styles';

const UpdateBar = () => {
  const {
    isUpdating,
    isError,
  } = useBoxDataContext();

  return (
    <Styles.UpdateBar $shouldShowUpdateBar={isUpdating || isError}>
      {isUpdating ? (
        <Styles.Text>Updating!</Styles.Text>
      ) : (
        <Styles.Text>
          {isError ? (
            <>Error!</>
          ) : (
            <>Data loaded!</>
          )}
        </Styles.Text>
      )}
    </Styles.UpdateBar>
  );
};

export { UpdateBar };
