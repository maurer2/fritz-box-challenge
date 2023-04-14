// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { FC } from 'react';

import { BoxDataContext } from '../DataProvider';

import * as Styles from './UpdateBar.styles';

const UpdateBar: FC<Record<string, never>> = () => {
  const state = React.useContext(BoxDataContext);

  const isUpdating = 'isUpdating' in state ? state.isUpdating : true;
  const isValid = 'isValid' in state ? state.isValid : false;

  return (
    <Styles.UpdateBar isUpdating={isUpdating}>
      {isUpdating ? (
        <Styles.Text>Updating!</Styles.Text>
      ) : (
        <Styles.Text>
          {!isValid && <>Error!</>}
          {!!isValid && <>Data loaded!</>}
        </Styles.Text>
      )}
    </Styles.UpdateBar>
  );
};

export { UpdateBar };
