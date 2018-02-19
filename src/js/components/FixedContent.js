import React from "react";

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
    </nav>
  ]
}