import React, { Component } from 'react';
import Intro from "./js/components/Intro.js";
import Quiz from "./js/components/Quiz.js";
import Results from "./js/components/Results.js";
import Layout from "./js/components/Layout";
import Slide from "./js/components/Slide";
import FixedContent from "./js/components/FixedContent";
import Preamble from "./js/components/Preamble";
import fetchQuestions from './js/api/fetchQuestions';

const colors = [
  "#014e67",
  "#e44b4a",
  "#00bfad",
  "#3191c2",
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      pageIndex: 0,
      loading: true,
    };

    this.updateScore = this.updateScore.bind(this);
    this.getScore = this.getScore.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.onFacebookLogin = this.onFacebookLogin.bind(this);
    this.onSlideDotClick = this.onSlideDotClick.bind(this);

    this.componentArr = [
      props => <Intro
        {...props}
        nextScreen={() => this.setState({ pageIndex: 1 })}
      />,
      props => <Preamble
        onFacebookLogin={this.onFacebookLogin}
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
        picture={this.state.userData && this.state.userData.picture}
        score={this.getScore()}
      />
    ];
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.pageIndex !== nextState.pageIndex) {
      for (let i = 0; i < this.componentArr.length; i += 1) {
        const isTransitioning = (
          i === this.state.pageIndex ||
          i === nextState.pageIndex);

        const el = document.getElementById(`slide-${i}`);
        el.style.transition = isTransitioning ? "" : "none";
        el.style.zIndex = isTransitioning ? (30 - i) : "";
      }
    }
  }

  getQuestions() {
    fetchQuestions()
      .then((data) => {
        this.setState({
          loading: false,
          questions: data,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          err,
        });
      });
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

  onFacebookLogin(data) {
    this.setState({ userData: data });
  }

  setPageIndex(pageIndex) {
    this.setState({
      pageIndex,
    });
  }

  onSlideDotClick(i) {
    this.setState({
      pageIndex: i,
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

    if (this.state.err) {
      return (
        <div>
          Gat ekki sótt spurningar.
        </div>
      )
    }

    return (
      <Layout>
        <FixedContent
          pageIndex={this.state.pageIndex}
          onSlideDotClick={this.onSlideDotClick}
        />
        <div
          className="background"
          style={{
            backgroundColor: colors[this.state.pageIndex],
          }}
        >
          <div className="slide-container">
            <div
              className={"logo" + (this.state.pageIndex !== 0 ? " on-screen" : "")}
              alt="Site logo"
            >
              <img
                src="/images/logo.svg"
                alt="Site logo"
              />
            </div>
            {
              this.componentArr
                .map((Component, i) => (
                  <Slide
                    dark={i === 0}
                    key={i}
                    id={`slide-${i}`}
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