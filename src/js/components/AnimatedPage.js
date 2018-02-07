import React, { Component } from "react";

import { Transition } from "react-transition-group";
import animateFor from "../utils/animateFor";
import constants from "../constants";

const AnimatedWrapper = WrappedComponent => class AnimatedPage extends Component {
  constructor(props) {
    super(props);

    this.id = Math.random().toString();

    this.animateTransform = (f) => {
      if (window.innerWidth > constants.mobile) {
        const el = document.getElementById(this.id);
        el.style.transform = `translateX(-${(f * 100).toFixed(1)}%)`;
      } else {
        const el = document.getElementById(this.id);
        el.style.transform = `translateY(${(f * 100).toFixed(1)}%)`;
      }
    };

    this.onExiting = this.onExiting.bind(this);
    this.onEntering = this.onEntering.bind(this);
  }

  onEntering() {
    animateFor(this.animateTransform, { from: 1, to: 0 });
  }

  onExiting() {
    animateFor(this.animateTransform, { from: 0, to: 1 });
  }

  render() {
    return (
      <Transition
        in={this.props.in}
        timeout={300}
        onEntering={this.onEntering}
        onExiting={this.onExiting}
      >
        <div id={this.id} className="page-wrapper">
          <div className="page-wrapper-inner">
            <WrappedComponent />
          </div>
        </div>
      </Transition>
    );
  }
}

export default AnimatedWrapper;
