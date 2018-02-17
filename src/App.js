import React, { Component } from 'react';
import Intro from "./js/components/Intro.js";
import Quiz from "./js/components/Quiz.js";
import Results from "./js/components/Results.js";
import Layout from "./js/components/Layout";
import Slide from "./js/components/Slide";
import FixedContent from "./js/components/FixedContent";
import Preamble from "./js/components/Preamble";
import axios from 'axios';

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
      scores: [],
      pageIndex: 0,
      loading: true,
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
        questions={this.state.questions}
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

  componentDidMount() {
    const useFakeData = false;
    if (useFakeData) {
      this.setState({
        loading: false,
        questions:[
          {
            question: "Hér er spurning",
            answers: [
              {
                text: "Hér er svar 1",
                scores: [
                  { name: "Byggingatækni", score: 1 },
                ],
              },
            ],
          },
        ]
      })
    } else {
      axios.get("http://framaprof.vefskoli.is/api/")
        .then(({ data }) => {
          console.log(data.results);
          this.setState({
            loading: false,
            questions: data.results,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
  }

  getScore() {
    const scoreObj = {};

    for (let i = 0; i < this.state.scores.length; i += 1) {
      for (let j = 0; j < this.state.scores[i].length; j += 1) {
        const { name, score } = this.state.scores[i][j];

        if (typeof scoreObj[name] !== "number") {
          scoreObj[name] = 0;
        }

        scoreObj[name] += score;
      }
    }

    return scoreObj;
  }

  setPageIndex(pageIndex) {
    this.setState({
      pageIndex,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          Loading
        </div>
      )
    }

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
