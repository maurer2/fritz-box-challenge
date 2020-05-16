import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './UpdateBar.styles';
import * as Types from './UpdateBar.types';

const UpdateBar: React.FC<Types.UpdateBarProps> = ({ isUpdating, isValid }): JSX.Element => (
  <Styles.UpdateBar isUpdating={isUpdating}>
    { isUpdating ? (
      <Styles.Text>
        Updating!
      </Styles.Text>
    ) : (
      <Styles.Text>
        { !isValid && <>Error!</> }
        { !!isValid && <>Data loaded!</> }
      </Styles.Text>
    )}
  </Styles.UpdateBar>
);

const { bool } = PropTypes;

UpdateBar.propTypes = {
  isUpdating: bool.isRequired,
  isValid: bool.isRequired,
};

export { UpdateBar };
