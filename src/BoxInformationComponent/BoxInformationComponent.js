import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const BoxInformationWrapper = styled.ul`
  display: block;
  margin: 0;
  padding: 2rem;
  background: red;
`;

const BoxInformationEntry = styled.li`
  display: block;
`;

class BoxInformationComponent extends PureComponent {
  render() {
    const listEntries = Object.keys(this.props.list);

    return (
      <BoxInformationWrapper>
        { listEntries.map((entry, index) => (
          <BoxInformationEntry key={ index }>
            { entry }: { this.props.list[entry] }
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
