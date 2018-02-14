import React from "react";

export default class Slide extends React.Component {
  render() {
    const isActive = this.props.currentPage === this.props.pageIndex;

    const translate = isActive
      ? "translateY(0)"
      : `translateY(${this.props.currentPage > this.props.pageIndex ? "-" : ""}100%)`;

    return (
      <div
        className={"slide-content" + (isActive ? " active" : "")}
        style={{ transform: translate, zIndex: 20 - this.props.pageIndex }}
      >
        {
          this.props.children
        }
      </div>
    );
  }
}