import React from "react";
import PrimaryButton from "./PrimaryButton";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.questions = this.props.questions;

    this.state = {
      questionIndex: 0,
      answers: this.questions.map(() => null),
    };

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.onAnswerClick = this.onAnswerClick.bind(this);
  }

  onAnswerClick(qIndex, aIndex) {
    const newIndex = this.state.answers[qIndex] === aIndex
      ? null
      : aIndex;

    this.setState({
      answers: this.state.answers.map((a, i) => (
        i === qIndex
          ? newIndex
          : a
      )),
    });

    if (newIndex === null) {
      this.props.updateScore({}, qIndex);
    } else {
      this.props.updateScore(this.questions[qIndex].answers[aIndex].scores, qIndex)
    }
  }

  prev() {
    if (this.state.questionIndex > 0) {
      this.setState({
        questionIndex: this.state.questionIndex - 1,
      });
    }
  }

  next() {
    if (this.state.questionIndex >= this.state.answers.length - 1) {
      this.props.completeQuiz();
    } else if (this.state.questionIndex < this.questions.length) {
      this.setState({
        questionIndex: this.state.questionIndex + 1,
      });
    }
  }

  render() {
    const getQuestionTranslate = (qIndex) => {
      if (qIndex === this.state.questionIndex) {
        return "translateX(0)";
      } else {
        return `translateX(${this.state.questionIndex > qIndex ? "-" : ""}100%)`;
      }
    };

    return [
      <div className="quiz-lamp-container" key="0">
        <div className="quiz-lamp" />
      </div>,
      <div className="quiz-tv-container" key="1">
        <div className="quiz-tv" />
      </div>,
      <div className="quiz-radio-container" key="2">
        <div className="quiz-radio" />
      </div>,
      <div className="quiz-container" key="3">
        <div className="question-list-container">
          {
            this.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="question-container"
                style={{ transform: getQuestionTranslate(qIndex) }}
              >
                <p className="question-title-number">{qIndex + 1}</p>
                <h2>{question.question}</h2>
                <ul>
                  {
                    question.answers.map((answer, aIndex) => (
                      <li key={aIndex}>
                        <button
                          className={"answer-checkbox" +
                            (this.state.answers[qIndex] === aIndex ? " checked" : "")}
                          onClick={() => this.onAnswerClick(qIndex, aIndex)}
                        />
                        <button
                          className="quiz-answer-text"
                          onClick={() => this.onAnswerClick(qIndex, aIndex)}
                        >
                          {answer.text}
                        </button>
                      </li>
                    ))
                  }
                </ul>
                <PrimaryButton
                  color="#00bfad"
                  onClick={this.next}
                  disabled={typeof this.state.answers[qIndex] !== "number"}
                >
                  Næsta spurning
                </PrimaryButton>
                <p className="question-number">Spurning {qIndex + 1} af {this.state.answers.length}</p>
              </div>
            ))
          }
        </div>
        {/*
        <button onClick={this.prev}>Back</button>
        <button
          onClick={this.next}
          disabled={typeof this.state.answers[this.state.questionIndex] !== "number"}
        >
          Next
        </button>
        */}
      </div>
    ];
  }
}
