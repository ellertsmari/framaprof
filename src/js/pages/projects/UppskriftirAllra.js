import React from "react";
import Project from "../Project";
import TechUsed from "../../components/TechUsed";

import constants from "../../constants";

class ProjectUppskriftirAllra extends React.Component {
  constructor(props) {
    super(props);
    this.primaryColor = "#42b0f0";
  }

  render() {
    return (
      <div className="project-container">
        <div className="page-content-container">
          <div className="project-content">
            <h1 style={{ color: this.primaryColor, marginTop: "8rem" }}>
              Uppskriftir&shy;Allra.is
            </h1>
            <TechUsed
              items={["react", "redux", "graphql", "nodejs", "apollo", "mysql"]}
            />
            <p>
              A site where anyone can sign up, share, collect and find recipes.
            </p>
            <p>
            The site’s purpose is to create an Icelandic place to gather recipes and function as a tool for food and recipe enthusiasts to share and   collect recipes.
            </p>

            <p>
              The project was a side project for a long time, and is entirely a solo project.
            </p>
            <figure>
              <img src="/images/uppskrift-home.jpg" alt="" />
              <figcaption>
                Top of the front page
              </figcaption>
            </figure>
            <p>
              The main features:
            </p>
            <ul>
              <li>Creating a recipe with a simple-to-use user interface</li>
              <li>Creating collections and storing your and other user’s recipes in them.</li>
              <li>Category system using tags to more easily categorize and find recipes</li>
              <li>A profile page showcasing your recipes and collections</li>
              <li>Private recipes and collections</li>
              <li>Custom account system (signup process, password reset, email notifications etc.)</li>
              <li>Autosave when creating a recipe (until published)</li>
            </ul>
            <figure>
              <img src="/images/uppskrift-editor.jpg" alt="" />
              <figcaption>
                Part of the recipe editor
              </figcaption>
            </figure>
            <p style={{ marginTop: "3rem" }}>
              And the tech stack
            </p>
      	    <ul>
              <li>The front end of the site uses React, Redux and Apollo.</li>
              <li>The back end is composed of Node.js, Express, GraphQL, MySQL and Redis.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Project(ProjectUppskriftirAllra, constants.projectColors.bezier);
