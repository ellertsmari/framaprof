import React from "react";

export default class Intro extends React.Component {
  render() {
    return (
      <div className="intro-container">
        <video src="/videos/intro-video.mp4" muted loop autoPlay />
        <div className="intro-overlay">
          <div className="intro-text-container">
            <div className="intro-logo" />
            <p className="intro-text">
              Það geta ekki allir orðið Eurovision stjörnur en það geta allir átt sinn frama!<br />
              <button onClick={this.props.nextScreen}>Hver er þinn frami?</button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}