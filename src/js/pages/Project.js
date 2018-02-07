import React, { Component } from "react";
import shortid from "shortid";
import { Transition } from "react-transition-group";

import animateFor from "../utils/animateFor";
import { animateToColor } from "../utils/background";
import constants from "../constants";

const Project = (ProjectContent, color) => class Project extends Component {
  constructor(props) {
    super(props);

    this.id = shortid();

    this.setZIndex = (zIndex) => {
      const el = document.getElementById(this.id);
      if (window.innerWidth > constants.mobile) {
        el.style.zIndex = zIndex;
      } else {
        el.style.zIndex = -100;
      }
    };

    this.animateTransform = (f) => {
      if (window.innerWidth > constants.mobile) {
        const el = document.getElementById(this.id);
        el.style.transform = `translateX(${(f * 100).toFixed(1)}%)`;
      } else {
        const el = document.getElementById(this.id);
        el.style.transform = `translateY(-${(f * 100).toFixed(1)}%)`;
      }
    };

    this.onExiting = this.onExiting.bind(this);
    this.onEntering = this.onEntering.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth <= constants.mobile) {
      this.setZIndex(-100);
    }
  }

  onEntering() {
    animateToColor(color);
    this.setZIndex(-1000);
    animateFor(this.animateTransform, { from: 1, to: 0 }, () => this.setZIndex(""));
  }

  onExiting() {
    animateToColor();
    this.setZIndex(-1000);
    animateFor(this.animateTransform, { from: 0, to: 1 }, () => this.setZIndex(""));
  }

  render() {
    return (
      <Transition
        in={this.props.in}
        timeout={0}
        onEntering={this.onEntering}
        onExiting={this.onExiting}
      >
        <div id={this.id} className="page-wrapper">
          <div className="page-wrapper-inner">
            <ProjectContent />
          </div>
        </div>
      </Transition>
    );
  }
}

export default Project;
