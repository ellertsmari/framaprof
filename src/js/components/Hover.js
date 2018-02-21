import React from "react";

export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.timeout = null;

    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({
        active: true,
      });
    }, 10);
  }

  onMouseOut() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({
        active: false,
      });
    }, 200);
  }
  
  render() {
    return (
      <div
        className="hover-area-wrapper"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div
          className={`hover-container${
              this.props.position
                ? ` hover-container-${this.props.position}`
                : ""}${
              this.props.arrowPosition
                ? ` arrow-${this.props.arrowPosition}`
                : ""
              }` + (this.state.active ? " active" : "")}
        >
          <div className="hover-content">
            {
              this.props.content
            }
          </div>
        </div>
        {
          this.props.children
        }
      </div>
    );
  }
}