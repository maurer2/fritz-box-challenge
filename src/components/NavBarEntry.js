import React, { PureComponent } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const NavBarEntryWrapper = styled.li`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${props => (props.isFullWidth ? '33%' : '0')};
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
  color: ${props => (props.isActive ? '#080808' : '#121212')};
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
  transition: color 500ms;
`;

class NavBarEntry extends PureComponent {
  constructor(props) {
    super(props);

    this.elementRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleNavigation(this.props.index);
  }

  render() {
    const { isActive, entry, activeElementRef, isFullWidth } = this.props;

    return (
      <NavBarEntryWrapper
        onClick={ this.handleClick }
        isFullWidth={ isFullWidth }
        ref={ activeElementRef }
      >
        <NavBarButton isActive={ isActive }>
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
  isFullWidth: PropTypes.bool,
};

export default NavBarEntry;
