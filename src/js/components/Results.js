import React from "react";
import PrimaryButton from "./PrimaryButton";

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

      this.setState({
        calculatedResults: true,
        orderedkeys: keys,
        top: keys.filter((_, i) => i < 3),
      });
    }
  }

  render() {
    if (!this.props.isActive) {
      return null;
    }

    return (
      this.state.calculatedResults
        ? (
          <div className="results-container">
            <ul className="results-top-list">
              {
                this.state.top.map(key => (
                  <li className="result-item" key={key}>
                    <p>{this.props.score[key]}</p>
                    <p className="result-item-value">{key}</p>
                  </li>
                ))
              }
            </ul>
            <div className="results-main-container">
              <div className="results-text-container">
                <p>Þinn frami gæti legið í</p>
                <h2>
                  {this.state.top[0]}
                </h2>
                <p>
                  <strong>
                    Kynntu þér málið nánar hjá þeim skólum sem kenna {this.state.top[0]}
                  </strong>
                </p>
                <p>
                  <strong>Tækniskólinn</strong> - <a href="http://tskoli.is">Sjá nánar</a>
                </p>
                <p>
                  <strong>Fjölbraut Ármúla</strong> - <a href="http://www.fa.is/">Sjá nánar</a>
                </p>
                <p className="results-about-the-test">
                  Við bendum á að prófið er til gamans gert og ef þú hefur áhuga á að kynna þér námsgreinarnar betur þá getur þú leitað þér ráðgjafar hjá námsráðgjöfum skólanna.
                </p>
                <PrimaryButton color="#00bfad">
                  Deila
                </PrimaryButton>
              </div>
              <div className="results-tv-container">
                <div className="results-tv" />
              </div>
            </div>
          </div>
        )
        : null
    );
  }
}
