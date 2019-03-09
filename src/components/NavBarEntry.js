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

  getBoundingBox() {
    if (this.elementRef.current === null) {
      return 0;
    }

    const element = this.elementRef.current;

    return element.getBoundingClientRect();
  }

  componentDidMount() {
    const { isActive } = this.props;

    if (isActive) {
      const elementBoundingBox = this.getBoundingBox();

      this.props.handleIndicatorUpdate(elementBoundingBox.x, elementBoundingBox.width);
    }
  }

  componentDidUpdate(prevProps) {
    const isNewActive = (this.props.isActive && !(prevProps.isActive));

    if (isNewActive) {
      const elementBoundingBox = this.getBoundingBox();

      this.props.handleIndicatorUpdate(elementBoundingBox.x, elementBoundingBox.width);
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
  handleIndicatorUpdate: PropTypes.func,
};

export default NavBarEntry;
