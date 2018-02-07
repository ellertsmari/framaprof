import React, { Component } from 'react';
import Intro from "./js/components/Intro.js";
import Quiz from "./js/components/Quiz.js";
import Results from "./js/components/Results.js";
import Layout from "./js/components/Layout";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onScreen: "INTRO",
      scores: [],
    };

    this.updateScore = this.updateScore.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  updateScore(newScore, qIndex) {
    if ((this.state.scores.length) > qIndex) {
      this.setState({
        scores: this.state.scores.map((currentScore, i) => (
          i === qIndex
            ? newScore
            : currentScore
        )),
      });
    } else {
      this.setState({
        scores: [
          ...this.state.scores,
          newScore,
        ],
      });
    }

    setTimeout(() => {
      console.log(this.getScore(), this.state);
    })
  }

  getScore() {
    const score = {};

    for (let i = 0; i < this.state.scores.length; i += 1) {
      const currentScore = this.state.scores[i];
      const keys = Object.keys(currentScore);
      keys.forEach((key) => {
        score[key] = (score[key] || 0) + currentScore[key];
      });
    }

    return score;
  }

  render() {
    return (
      <Layout>
        <Intro
          isActive={this.state.active === "INTRO"}
          startQuiz={() => this.setState({ active: "QUIZ" })}
        />
        <Quiz
          isActive={this.state.active === "QUIZ"}
          updateScore={this.updateScore}
          completeQuiz={() => this.setState({ active: "RESULTS" })}
        />
        <Results
          isActive={this.state.active === "RESULTS"}
          score={this.getScore()}
        />
      </Layout>
    );
  }
}

export default App;
