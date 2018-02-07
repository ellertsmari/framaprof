import React from "react";

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calculatedResults: false,
      orderedkeys: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive && !this.props.isActive) {
      // calcing results lol.
      const keys = Object.keys(this.props.score);
      keys.sort((a, b) => this.props.score[b] - this.props.score[a]);

      setTimeout(() => {
        this.setState({ calculatedResults: true, orderedkeys: keys });
        console.log("CALCULATED RESULTS");
      }, 300);
    }
  }

  render() {
    if (!this.props.isActive) {
      return null;
    }

    return (
      <div className="results-container">
        {
          this.state.calculatedResults
            ? (
              <ul className="results-list">
                {
                  this.state.orderedkeys.map(key => (
                    <li className="result-item" key={key}>
                      {key.toUpperCase()}: {this.props.score[key]}
                    </li>
                  ))
                }
              </ul>
            )
            : "Calculating results..."
        }
      </div>
    );
  }
}
