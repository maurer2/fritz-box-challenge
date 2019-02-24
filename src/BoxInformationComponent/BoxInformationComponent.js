import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const BoxInformationWrapper = styled.ul`
  display: flex;
  margin: 0;
  padding: 0 2rem 2rem 2rem;
  justify-content: space-between;
  flex-wrap: wrap;
  background: red;
`;

const BoxInformationEntry = styled.li`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;

  @media (min-width: 768px) {
    flex-basis: 0;
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

const BoxInformationTitle = styled.h3`
  margin-top: 2rem;
`;

const BoxInformationValue = styled.span`
  white-space: nowrap;
`;

class BoxInformationComponent extends PureComponent {
  render() {
    const listFields = ['model', 'technology', 'restarts', 'branding'];

    return (
      <BoxInformationWrapper>
        { listFields.map((entry, index) => (
          <BoxInformationEntry key={ index }>
            <BoxInformationTitle>
              { entry }
            </BoxInformationTitle>
            <BoxInformationValue>
              { this.props.list[entry] }
            </BoxInformationValue>
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
