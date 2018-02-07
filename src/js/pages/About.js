import React from "react";

import AnimatedPage from "../components/AnimatedPage";

function About() {
  return (
    <div className="page-content">
      <h1>About</h1>
      <p>This is the about page, a bunch of info goes here.</p>
    </div>
  );
}

export default AnimatedPage(About);
