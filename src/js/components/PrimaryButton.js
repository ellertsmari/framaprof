import React from "react"

export default function PrimaryButton(props) {
  return (
    <button className="primary-button-container" onClick={props.onClick} disabled={props.disabled}>
      <div
        className="primary-button-background"
        style={{
          backgroundColor: props.color,
        }}
      />
      <p
        className="primary-button-text"
        style={props.textColor
          ? { color: props.textColor }
          : {}}
      >
        {
          props.children
        }
      </p>
    </button>
  )
}
