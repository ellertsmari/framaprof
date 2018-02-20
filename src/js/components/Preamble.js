import React from "react";
import PrimaryButton from "./PrimaryButton";
import FacebookLoginButton from "./FacebookLogin";

export default class Preamble extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLoginStart = this.onLoginStart.bind(this);
  }

  onLoginStart() {
    this.setState({
      loading: true,
    });
  }

  onLogin(err, data) {
    this.setState(err
      ? { loading: false, err }
      : { loading: false });

    // No data is returned if the user closed the popup.
    if (data) {
      this.props.onFacebookLogin(data);
      this.props.nextScreen();
    }
  }

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
          <PrimaryButton onClick={this.props.nextScreen} color="#e44b4a">
            Taka próf
          </PrimaryButton>
          <FacebookLoginButton
            onLoginStart={this.onLoginStart}
            onLogin={this.onLogin}
            text="Taka próf með Facebook"
          />
          {
            this.state.loading
              ? <p>Loading</p>
              : null
          }
          <button className="preamble-start-quiz-no-auth">
            Taka próf án auðkenningar
          </button>
        </div>
      </div>
    );
  }
}