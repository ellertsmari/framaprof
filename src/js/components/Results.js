import React from "react";
import PrimaryButton from "./PrimaryButton";
import Hover from "./Hover";

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
    return (
      this.state.calculatedResults
        ? (
          <div className="results-container">
            <div className="results-shelf-container">
              <ul className="results-list">
                {
                  this.state.top.map(key => (
                    <li className="result-item" key={key}>
                      <Hover content={(
                        <div>
                          <p>CONTENTCONTENTCONTENT</p>
                          <p>CONTENTCONTENTCONTENT</p>
                          <p>CONTENTCONTENTCONTENT</p>
                          <p>CONTENTCONTENTCONTENT</p>
                          <p>CONTENTCONTENTCONTENT</p>
                        </div>
                      )}>
                        <p>{Math.round(this.props.score[key])}</p>
                        <p className="result-item-value">{key}</p>
                      </Hover>
                    </li>
                  ))
                }
              </ul>
              <div className="result-shelf" />
            </div>
            <div className="results-mid-container">
              <div className="results-image-container">
                <div className="results-image-frame" />
                <div className="results-image-frame-shadow" />
                <div
                  className="results-image"
                  style={{
                    backgroundImage: this.props.picture
                      ? `url("${this.props.picture.url}")`
                      : "none"
                  }}
                />
              </div>
              <div className="results-text-container">
                <p className="results-subtitle">Þinn frami gæti legið í...</p>
                <h2>
                  {this.state.top[0]}
                </h2>
                <PrimaryButton color="#3191c2">
                  Deila
                </PrimaryButton>
              </div>
            </div>
            <div className="results-bottom-buttons">
              <PrimaryButton color="#3191c2">
                Ég vil læra {this.state.top[0]}
              </PrimaryButton>
              <PrimaryButton color="white" textColor="#3191c2">
                Taka prófið aftur
              </PrimaryButton>
            </div>
          </div>
        )
        : null
    );
  }
}
