import React from "react";

export default class Preamble extends React.Component {
  render() {
    return (
      <div className="preamble-container">
        <div className="preamble-cable" />
        <div className="preamble-computer" />
        <div className="preamble-hammer" />
        <div className="preamble-text-container">
          <h2>
            Ísland vinnur Eurovision 2018 og það er komið að okkur að búa til flottustu Eurovision hátíð sem hefur verið haldin árið 2019!
          </h2>
          <p className="preamble-text">
            <strong>Til þess þurfum við iðn og tæknimenntað fólk</strong>
            - hvaða hlutverk tekur þú að þér? -
          </p>
          <button className="preamble-start-quiz-button" onClick={this.props.nextScreen}>
            <div className="preamble-start-quiz-button-background" />
            <p className="preamble-take-quiz-text">
              Taka próf
            </p>
            <p className="preamble-with-facebook">
              Með Facebook Auðkenningu
            </p> 
          </button>
          <button className="preamble-start-quiz-no-auth">
            Taka próf án auðkenningar
          </button>
        </div>
      </div>
    );
  }
}