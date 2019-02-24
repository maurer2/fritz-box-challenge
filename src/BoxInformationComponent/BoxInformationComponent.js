import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import BoxEntryComponent from '../BoxEntryComponent/BoxEntryComponent';

const BoxInformationWrapper = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  flex-wrap: wrap;
  background: red;
`;

const BoxInformationEntry = styled.li`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 0;

  @media (min-width: 480px) {
    flex-basis: 0;
  }
`;

class BoxInformationComponent extends PureComponent {
  render() {
    const listFields = ['model', 'technology', 'restarts', 'branding'];

    return (
      <BoxInformationWrapper>
        { listFields.map((entry, index) => (
          <BoxInformationEntry key={ index }>
            <BoxEntryComponent entry={ entry } value={ this.props.list[entry] } />
          </BoxInformationEntry>
        ))}
      </BoxInformationWrapper>
    );
  }
}

BoxInformationComponent.propTypes = {
  list: PropTypes.object,
};

export default BoxInformationComponent;
