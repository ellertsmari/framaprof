import React from "react";
import Project from "../Project";
import TechUsed from "../../components/TechUsed";

import constants from "../../constants";

class ProjectSpotifyDDR extends React.Component {
  constructor(props) {
    super(props);
    this.primaryColor = "#1cbd66";

    this.renderCanvas = this.renderCanvas.bind(this);
    this.addArrow = this.addArrow.bind(this);

    this.framesSinceLastArrow = 0;

    requestAnimationFrame(this.renderCanvas);

    this.arrows = [];

    for (let i = 0; i < 4; i += 1) {
      this.addArrow();
      this.arrows[i].x = i * 120;
    }

    this.arrowImages = [
      "up",
      "left",
      "right",
      "down",
    ]
      .map((dir) => {
        const img = document.createElement("img");
        img.src = `/images/arrow_${dir}.png`;
        return img;
      });
  }

  addArrow() {
    const orientation = Math.floor(Math.random() * 4);
    const arrow = {
      orientation,
      x: 0,
      y: (orientation * 65) + 16,
    };

    this.arrows.push(arrow);
  }

  renderCanvas() {
    requestAnimationFrame(this.renderCanvas);
    if (window.location.pathname !== "/projects/spotify-ddr") {
      return;
    }

    this.framesSinceLastArrow += 1;
    if (this.framesSinceLastArrow > 160 && (Math.random() > 0.008)) {
      this.framesSinceLastArrow = 0;
      this.addArrow();
    }

    const canvas = document.getElementById("spotify-header-canvas");
    const ctx = canvas.getContext("2d");

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.setAttribute("height", getComputedStyle(canvas).height);
    canvas.setAttribute("width", window.innerWidth + "px");

    ctx.clearRect(0, 0, width, height);

    const { arrows } = this;

    for (let i = arrows.length - 1; i >= 0; i -= 1) {
      if (arrows[i].x > width) {
        arrows.splice(i, 1);
      } else {
        let { x, y, orientation } = arrows[i];

        const arrowScale = window.innerWidth > constants.mobile
          ? .9
          : .65;

        ctx.drawImage(
          this.arrowImages[orientation],
          x - 50,
          arrowScale * (y + (Math.sin(x / 100) * 12)),
          arrowScale * this.arrowImages[orientation].width,
          arrowScale * this.arrowImages[orientation].height);
  
        arrows[i].x += 1;
      }
    }
  }

  componentDidMount() {
    this.renderCanvas();
  }

  render() {
    return (
      <div className="project-container">
        <header className="project-header spotify-header">
          <canvas
            className="project-header-canvas"
            id="spotify-header-canvas"
          />
        </header>
        <div className="page-content-container">
          <div className="project-content">
            <h1 style={{ color: this.primaryColor }}>
              Spotify DDR
            </h1>
            <TechUsed items={["threejs"]} />
            <p>
              A web based DDR clone in 3D using the Spotify API. This came from a school assignment to make a game in 1 week.
            </p>
            <p>
              The user is allowed to search for any song on Spotify. Then the audio from the track is then analyzed to find the beats and high points which are used to generate the arrows.
            </p>
            <p>
              The game is rendered using the Three.js library.
            </p>
            <figure>
              <img src="/images/spotify-ddr-example.jpg" alt="" />
              <figcaption>
                The game in action
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    );
  }
}

export default Project(ProjectSpotifyDDR, constants.projectColors["spotify-ddr"]);
