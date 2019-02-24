import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const BoxEntryWrapper = styled.div`
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const BoxEntryTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`;

const BoxEntryValue = styled.span`
  white-space: nowrap;
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
