import React from "react";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.questions = [
      {
        text: "This is the first question, and it's really hard",
        answers: [
          { text: "This is the first answer", score: { x: 1, y: 0, z: 0.5 } },
          { text: "This is the second answer", score: { x: 1, y: 1, z: 0.5 } },
          { text: "This is the third answer", score: { x: 0, y: 3, z: 1 } },
          { text: "This is the fourth answer", score: { x: 1, y: 0, z: 2 } },
        ],
      },
      {
        text: "Second question, think you can handle it?",
        answers: [
          { text: "1", score: { x: 1, y: 0, z: 0.5 } },
          { text: "2", score: { x: 1, y: 1, z: 0.5 } },
          { text: "3", score: { x: 0, y: 3, z: 1 } },
          { text: "4", score: { x: 1, y: 0, z: 2 } },
        ],
      },
      {
        text: "Question 3",
        answers: [
          { text: "1", score: { x: 1, y: 0, z: 0.5 } },
          { text: "2", score: { x: 1, y: 1, z: 0.5 } },
          { text: "3", score: { x: 0, y: 3, z: 1 } },
          { text: "4", score: { x: 1, y: 0, z: 2 } },
        ],
      },
      {
        text: "Question 4",
        answers: [
          { text: "1", score: { x: 1, y: 0, z: 0.5 } },
          { text: "2", score: { x: 1, y: 1, z: 0.5 } },
          { text: "3", score: { x: 0, y: 3, z: 1 } },
          { text: "4", score: { x: 1, y: 0, z: 2 } },
        ],
      },
    ];

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

    console.log(this.state.answers.map((a, i) => (
      i === qIndex
        ? newIndex
        : a
    )));

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
      this.props.updateScore(this.questions[qIndex].answers[aIndex].score, qIndex)
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
      <div className={"quiz-modal-container" + (this.props.isActive ? " active" : "")}>
        <div className="question-list-container">
          {
            this.questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="question-container"
                style={{ transform: getQuestionTranslate(qIndex) }}
              >
                <h2>{question.text}</h2>
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
        <button onClick={this.prev}>Back</button>
        <button
          onClick={this.next}
          disabled={typeof this.state.answers[this.state.questionIndex] !== "number"}
        >
          Next
        </button>
      </div>
    )
  }
}