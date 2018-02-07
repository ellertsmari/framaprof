import React from "react";

export default function Hoverable(props) {
  if (!props.label || typeof props.label !== "string") {
    throw new Error("Expected hover label to be a string.");
  }

  return (
    <div className="hoverable-wrapper">
      <div className="hoverable-container">
        <div className="hoverable-arrow" />
        {props.label}
      </div>
    </div>
  );
}