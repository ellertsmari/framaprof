import React from "react";
import { Link } from "react-router-dom";

import AnimatedPage from "../components/AnimatedPage";

function Projects() {
  return (
    <div className="page-content">
      <div>
        <h1>Projects</h1>
        <p><Link to="/projects/bezier">Bezier</Link></p>
        <p><Link to="/projects/spotify-ddr">Spotify DDR</Link></p>
        <p><Link to="/projects/uppskriftir-allra">UppskriftirAllra.is</Link></p>
        <p><Link to="/projects/riff">Reykjavík International Film Festival</Link></p>
      </div>
    </div>
  );
}

export default AnimatedPage(Projects);
