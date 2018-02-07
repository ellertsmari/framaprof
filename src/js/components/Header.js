import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <span className="logo">Logo lol</span>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
    </header>
  );
}