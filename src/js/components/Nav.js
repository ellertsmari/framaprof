import React from "react";
import { withRouter, Link } from "react-router-dom";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: window.location.pathname === "/",
    };

    this.state.showArrow = this.state.isOpen && window.history && window.history.state;

    this.props.history.listen(() => {
      if ((window.location.pathname === "/") !== this.state.isOpen) {
        this.setState({
          isOpen: !this.state.isOpen,
          showArrow: !this.state.isOpen && window.history && window.history.state,
        });
      } else if (this.state.isOpen) {
        this.setState({
          showArrow: window.history && window.history.state,
        });
      }
    });

    this.initialLength = this.props.history.length;

    this.goBackIfLength = () => {
      if (window.history && window.history.state) {
        this.props.history.goBack();
      }
    }
  }

  render() {
    let btnClass = "";
    if (this.state.isOpen && window.history && window.history.state) {
      btnClass = " nav-open-arrow";
    } else if (this.state.isOpen) {
      btnClass = " nav-open";
    }
    return (
      <div key="left-bar" className="nav-left-bar">
        <Link
          className={"nav-open-button " + btnClass}
          {
            ...(
              this.state.showArrow
                ? { onClick: this.goBackIfLength, to: "" }
                : {
                  to: "/",
                  onClick: this.state.isOpen
                    ? (e) => { e.preventDefault(); }
                    : null
                }
            )
          }
        >
          {
            [1, 2, 3].map((i) => <span key={i} className="nav-open-button-line" />)
          }
        </Link>
      </div>
    );
  }
}

export default withRouter(Nav);