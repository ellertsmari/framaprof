import React, { Component } from 'react';
import Intro from "./js/components/Intro.js";
import Quiz from "./js/components/Quiz.js";
import Results from "./js/components/Results.js";
import Layout from "./js/components/Layout";
import Slide from "./js/components/Slide";
import FixedContent from "./js/components/FixedContent";
import Preamble from "./js/components/Preamble";

const colors = [
  "#3191c2",
  "#e44b4a",
  "#00bfad",
  "#00bfad",
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onScreen: "INTRO",
      scores: [],
      pageIndex: 0,
    };

    this.screens = [
      { component: Intro, }
    ];

    this.componentArr = [
      props => <Intro
        {...props}
        nextScreen={() => this.setState({ pageIndex: 1 })}
      />,
      props => <Preamble
        nextScreen={() => this.setState({ pageIndex: 2 })}
        {...props}
      />,
      props => <Quiz
        {...props}
        updateScore={this.updateScore}
        completeQuiz={() => this.setState({ pageIndex: 3 })}
      />,
      props => <Results
        {...props}
        score={this.getScore()}
      />
    ];

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

  setPageIndex(pageIndex) {
    this.setState({
      pageIndex,
    });
  }

  render() {
    return (
      <Layout>
        <FixedContent pageIndex={this.state.pageIndex} />
        <div
          className="background"
          style={{
            backgroundColor: colors[this.state.pageIndex],
          }}
        >
          <div className="slide-container">
            {
              this.componentArr
                .map((Component, i) => (
                  <Slide
                    key={i}
                    currentPage={this.state.pageIndex}
                    pageIndex={i}
                  >
                    <Component isActive={this.state.pageIndex === i} />
                  </Slide>
                ))
            }
          </div>
        </div>
      </Layout>
    );
  }
}

export default App;
