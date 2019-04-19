import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import NavBarEntry from './NavBarEntry';

const SlideYTransition = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  > .${props => props.transitionName}-appear {
    transform: translateY(100%);
    transition: transform 500ms ease-out;

    &.${props => props.transitionName}-appear-active {
      transform: translateY(0);
    }
  }

  > .${props => props.transitionName}-leave {
    transform: translateY(0);
    transition: transform 5000ms ease-in;

    &.${props => props.transitionName}-leave-active {
      transform: translateY(100%);
    }
  }
`;

const NavBarWrapper = styled.footer`
  position: relative;
  display: block;
  padding-top: ${props => props.reservedSpaceTop}px;
`;

const Indicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => (props.width === 'auto' ? props.width : `${props.width}px`)}; // might cause layout thrashing
  height: ${props => props.height}px;
  transform: translateX(${props => props.offset}px);
  transition: transform 500ms, width 500ms;
  background: white;
`;

const NavBarList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
  background: #BDBDBD;
`;

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      width: 'auto',
      height: 5,
    };

    this.activeElement = React.createRef();
  }

  componentDidMount() {
    this.updateIndicator();
  }

  componentDidUpdate(prevProps) {
    const activeElementHasChanged = this.props.currentIndex !== prevProps.currentIndex;

    if (activeElementHasChanged) {
      this.updateIndicator();
    }
  }

  updateIndicator() {
    if (this.activeElement.current == null) {
      return;
    }
    const activeElementBoundingBox = this.activeElement.current.getBoundingClientRect();

    this.setState({
      offset: activeElementBoundingBox.x,
      width: activeElementBoundingBox.width,
    });
  }

  render() {
    const { boxData, currentIndex, handleNavigation } = this.props;
    const { offset, width, height } = this.state;
    const transitionName = 'slide-vertically';

    return (
      <SlideYTransition transitionName={ transitionName }>
        <CSSTransitionGroup
          component={ React.Fragment }
          transitionAppear={ true }
          transitionEnter={ false }
          transitionName={ transitionName }
          transitionAppearTimeout={ 500 }
          transitionLeaveTimeout={ 500 }
          transitionEnterTimeout={ 0 }
        >
          <NavBarWrapper reservedSpaceTop={ height }>
            <Indicator offset={ offset } width={ width } height={ height } />
            <NavBarList>
              { Object.keys(boxData).map((entry, index) => (
                <NavBarEntry
                  index={ index }
                  entry={ entry }
                  isActive={ currentIndex === index }
                  handleNavigation={ handleNavigation }
                  activeElementRef={ (currentIndex === index) ? this.activeElement : null }
                  key={ index }
                />
              ))}
            </NavBarList>
          </NavBarWrapper>
        </CSSTransitionGroup>
      </SlideYTransition>
    );
  }
}

Navbar.propTypes = {
  boxData: PropTypes.object,
  handleNavigation: PropTypes.func,
  currentIndex: PropTypes.number,
};

export default Navbar;
