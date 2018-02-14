import React from "react";

export default class Intro extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="intro-container">
        <div className="intro-lights" />
        <div className="intro-handyman" />
        <div className="intro-band" />
        <div className="intro-text-container">
          <h1>Frama Prófið</h1>
          <p className="intro-text">
            Það geta ekki allir orðið Eurovision stjörnur en það geta allir átt sinn frama!<br />
            <strong>Hver er þinn frami?</strong>
          </p>
          <button className="start-quiz-button" onClick={this.props.nextScreen}>
            Byrja prófið
          </button>
        </div>
      </div>
    );
  }
}