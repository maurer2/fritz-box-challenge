import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const NavBarEntryWrapper = styled.li`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  background: ${props => (props.isActive ? '#cc0000' : 'transparent')};
`;

const defaultButton = styled.button`
  padding: 1rem;
  appearance: none;
  background: none;
  outline: none;
`;

const NavBarButton = styled(defaultButton)`
  display: block;
  width: 100%;
  border: 0;
  font-size: 1rem;
`;

class NavBarEntry extends Component {
  constructor(props) {
    super(props);

    this.elementRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleNavigation(this.props.index);
  }

  render() {
    const { isActive, entry, activeElementRef } = this.props;

    return (
      <NavBarEntryWrapper isActive={ isActive } onClick={ this.handleClick } ref={ activeElementRef }>
        <NavBarButton>
          { upperFirst(entry) }
        </NavBarButton>
      </NavBarEntryWrapper>
    );
  }
}

NavBarEntry.propTypes = {
  index: PropTypes.number,
  entry: PropTypes.string,
  isActive: PropTypes.bool,
  handleNavigation: PropTypes.func,
  activeElementRef: PropTypes.any,
};

export default NavBarEntry;
