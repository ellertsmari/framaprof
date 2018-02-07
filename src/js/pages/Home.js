import React from "react";

import AnimatePageBackgroundOpen from "../animations/AnimatePageBackgroundOpen";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="page-content page-home">
      <div className="home-link-container">
        <Link className="home-link" to="/projects">Projects</Link><br />
        <Link className="home-link" to="/about">About me</Link><br />
      </div>
      <h1 className="title-shadow">Alex <span className="home-harri">Harri</span></h1>
    </div>
  );
}

export default AnimatePageBackgroundOpen(Home);
