import React, { Component } from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

import NavBarEntry from './NavBarEntry';

const NavBarWrapper = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  flex-wrap: wrap;
  background: red;
  list-style: none;
`;

const SlideYTransition = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  .slide-appear,
  .slide-enter {
    transform: translateY(100%);
  }

  .slide-appear.slide-appear-active,
  .slide-enter.slide-enter-active {
    transform: translateY(0);
    transition: transform 250ms ease-out;
  }

  .slide-leave {
    transform: translateY(0);
  }

  .slide-leave.slide-leave-active {
    transform: translateY(100%);
    transition: transform 250ms ease-out;
  }
`;

const Indicator = styled.div`
  display: block;
  width: ${props => props.width}px;
  height: 5px;
  background: green;
  transform: translateX(${props => props.offset}px);
  transition: transform 500ms;
`;

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      width: 0,
    };

    this.activeElement = React.createRef();
    this.updateIndicator = this.updateIndicator.bind(this);
  }

  componentDidUpdate(prevProps) {
    const activeElementHasChanged = this.props.currentIndex !== prevProps.currentIndex;

    if (this.activeElement.current == null || !(activeElementHasChanged)) {
      return;
    }

    this.updateIndicator();
  }

  updateIndicator() {
    const element = this.activeElement.current;
    const elementBoundingBox = element.getBoundingClientRect();

    this.setState({
      offset: elementBoundingBox.x,
      width: elementBoundingBox.width,
    });
  }

  render() {
    const { boxData, isUpdating, currentIndex, handleNavigation } = this.props;
    const { offset, width } = this.state;

    // this.updateIndicator();

    return (
      <SlideYTransition>
        <CSSTransitionGroup
          component={ React.Fragment }
          transitionAppear={ false }
          transitionName="slide"
          transitionAppearTimeout={ 0 }
          transitionLeaveTimeout={ 250 }
          transitionEnterTimeout={ 250 }
        >
          { !isUpdating && (
            <>
              <Indicator offset={ offset } width={ width } />
              <NavBarWrapper>
                { Object.keys(boxData).map((entry, index) => (
                  <NavBarEntry
                    index={ index }
                    entry={ entry }
                    isActive={ currentIndex === index }
                    key={ index }
                    handleNavigation={ handleNavigation }
                    activeElementRef={ (currentIndex === index) ? this.activeElement : null }
                  />
                ))}
              </NavBarWrapper>
            </>
          )}
        </CSSTransitionGroup>
      </SlideYTransition>
    );
  }
}

Navbar.propTypes = {
  boxData: PropTypes.object,
  isUpdating: PropTypes.bool,
  handleNavigation: PropTypes.func,
  currentIndex: PropTypes.number,
};

export default Navbar;
