import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { throttle } from 'lodash';

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
  flex-wrap: ${props => (props.isRow ? 'no-wrap' : 'wrap')};
  justify-content: space-between;
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
      showIndicator: true,
    };

    this.activeElement = React.createRef();
    this.trottledResizeHandler = throttle(this.handleResize, 300);
  }

  componentDidMount() {
    this.updateIndicator();

    window.addEventListener('resize', this.trottledResizeHandler.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.trottledResizeHandler.bind(this));
  }

  componentDidUpdate(prevProps) {
    const activeElementHasChanged = this.props.currentIndex !== prevProps.currentIndex;

    if (activeElementHasChanged) {
      this.updateIndicator();
    }
  }

  handleResize() {
    this.updateIndicator();
  }

  updateIndicator() {
    if (this.activeElement.current == null) {
      return;
    }
    const activeElementBoundingBox = this.activeElement.current.getBoundingClientRect();
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;

    this.setState({
      offset: activeElementBoundingBox.x,
      width: activeElementBoundingBox.width,
      showIndicator: isLargeScreen,
    });
  }

  render() {
    const { componentsToShow, currentIndex, handleNavigation } = this.props;
    const { offset, width, height, showIndicator } = this.state;
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
            { showIndicator && <Indicator offset={ offset } width={ width } height={ height } /> }
            <NavBarList isRow={ showIndicator }>
              { componentsToShow.map((entry, index) => (
                <NavBarEntry
                  index={ index }
                  entry={ entry }
                  isActive={ currentIndex === index }
                  handleNavigation={ handleNavigation }
                  activeElementRef={ (currentIndex === index) ? this.activeElement : null }
                  key={ index }
                  isFullWidth={ !showIndicator }
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
  componentsToShow: PropTypes.arrayOf(PropTypes.string),
  handleNavigation: PropTypes.func,
  currentIndex: PropTypes.number,
};

export default Navbar;
