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
    if (this.state.questionIndex < this.questions.length) {
      this.setState({
        questionIndex: this.state.questionIndex + 1,
      });
    }
  }

  completeQuiz() {

  }

  render() {
    const getQuestionTranslate = (qIndex) => {
      if (qIndex === this.state.questionIndex) {
        return "translateX(0)";
      } else {
        return `translateX(${this.state.questionIndex > qIndex ? "-" : ""}100%)`;
      }
    };

    return (
      <div className="quiz-container">
        <div className="question-list-container">
          {
            this.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="question-container"
                style={{ transform: getQuestionTranslate(qIndex) }}
              >
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
              </div>
            ))
          }
          <div
            className="question-container"
            style={{ transform: getQuestionTranslate(this.questions.length) }}
          >
            <h2>Tilbúinn að sjá niðurstöðurnar?</h2>
            <p>
              Smelltu á takkan fyrir neðan til þess að sjá niðurstöðurnar.
            </p>
            <button onClick={this.props.completeQuiz}>
              Checkum þetta
            </button>
          </div>
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
    )
  }
}