import React from "react";

const numFloors = 4;
const dotArr = [];

for (let i = 0; i < numFloors; i += 1) {
  dotArr.push((onClick, isActive) => (
    <button
      key={i}
      className={"slide-dot" + (isActive ? " active" : "")}
      onClick={() => onClick(i)}
    />
  ));
}

// <img src="images/logo.png" alt="Framaprófið" />
export default function FixedContent(props) {
  return [
    <div
      className="disco-ball"
      key="2"
      style={{
        top: `-${props.pageIndex * 30}px`,
      }}
    />,
    <div className="page-dots-container" key="3">
      {
        [1, 2, 3, 4, 5, 6]
          .map((i) => (
            <div key={i} className="page-dot" />
          ))
      }
    </div>,
    <nav id="main-nav" key="4">
      <p>Um framaprófið</p>
      <p>Samstarfsaðilar</p>
    </nav>,
    <div key="5" className="slide-dot-container">
      {
        dotArr.map((f, i) => f(props.onSlideDotClick, props.pageIndex === i))
      }
    </div>,
  ]
}