import React from "react";

export default class Intro extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="intro-container">
        <button
          onClick={this.props.startQuiz}
        >
          Byrja prófið
        </button>
      </div>
    );
  }
}