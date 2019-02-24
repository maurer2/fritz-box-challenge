import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const BoxEntryWrapper = styled.dl`
  display: block;
  margin: 1rem;
`;

const BoxEntryTitle = styled.dt`
  margin-top: 0;
  margin-bottom: 0;
  font-weight: bold;
`;

const BoxEntryValue = styled.dd`
  margin: 0;
`;

class BoxEntryComponent extends PureComponent {
  render() {
    return (
      <BoxEntryWrapper>
        <BoxEntryTitle>
          { this.props.entry.charAt(0).toUpperCase() + this.props.entry.slice(1) }
        </BoxEntryTitle>
        <BoxEntryValue>
        { this.props.value }
        </BoxEntryValue>
      </BoxEntryWrapper>
    );
  }
}

BoxEntryComponent.propTypes = {
  entry: PropTypes.string,
  value: PropTypes.string,
};

export default BoxEntryComponent;
