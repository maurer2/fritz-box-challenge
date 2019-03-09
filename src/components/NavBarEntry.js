import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

const NavBarEntryWrapper = styled.li`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  border-top-width: 4px;
  border-top-style: solid;
  border-top-color: ${props => (props.isActive ? 'black' : 'transparent')};
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

  getHorizontalOffset() {
    if (this.elementRef.current === null) {
      return 0;
    }

    const element = this.elementRef.current;
    const horizontalOffset = element.getBoundingClientRect().x;

    console.log(this.props.index, element, horizontalOffset);

    return horizontalOffset;
  }

  componentDidUpdate(prevProps) {
    const isNewActive = (this.props.isActive && !(prevProps.isActive));

    if (isNewActive) {
      this.getHorizontalOffset();
    }
  }

  handleClick() {
    this.props.handleNavigation(this.props.index);
  }

  render() {
    const { isActive, entry } = this.props;

    return (
      <NavBarEntryWrapper isActive={ isActive } onClick={ this.handleClick } ref={ this.elementRef }>
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
};

export default NavBarEntry;
