import React from "react";
import Project from "../Project";
import TechUsed from "../../components/TechUsed";
import constants from "../../constants";

class ProjectBezier extends React.Component {
  constructor(props) {
    super(props);
    this.primaryColor = "#2C99E8";

    this.renderCanvas = this.renderCanvas.bind(this);

    requestAnimationFrame(this.renderCanvas);
  }

  renderCanvas() {
    requestAnimationFrame(this.renderCanvas);
    if (window.location.pathname !== "/projects/bezier") {
      return;
    }

    const canvas = document.getElementById("bezier-header-canvas");
    const ctx = canvas.getContext("2d");

    let scale = Math.min(window.innerWidth / 2000, 0.5);
    if (window.innerWidth <= constants.mobile) {
      scale *= 1.5;
    }

    const resolvePoint = (point, i) => ({
      x: ((point.x * scale) + 32 + (Math.cos((Date.now() / 1000) + i) * 7)).toFixed(1),
      y: ((point.y * scale) + Math.sin((Date.now() / 1000) + i) * 7).toFixed(1),
    });

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.setAttribute("height", height + "px");
    canvas.setAttribute("width", width + "px");

    ctx.clearRect(0, 0, width, height);

    const points = [
      { x: -152, y: -25 },
      { x: 26, y: 330 },
      { x: 154, y: 77 },
      { x: 587, y: 64 },
      { x: 480, y: -93 },
      { x: 940, y: 120 },
      { x: 1400, y: -93 },
    ].map(resolvePoint);

    const handles = [
      { x: 150, y: 190 },
      { x: 514, y: 194 },
    ].map(resolvePoint);

    // Drawing the handles
    for (let i = 0; i < handles.length; i += 1) {
      const { x, y } = handles[i];
      ctx.fillStyle = this.primaryColor;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
    }


    function drawLine(from, to, color, width) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = width * scale * 2;
      ctx.stroke();
    }

    [ // Lines between points
      [points[0], points[2]],
      [points[1], points[2]],
      [points[2], points[3]],
      [points[3], points[4]],
      [points[3], points[5]],
      [points[5], points[6]],
    ]
      .forEach((pArr) => {
        const [from, to] = pArr;
        drawLine(from, to, "#666", 2);
      });

    [ // Lines between points and handles
      [points[1], handles[0]],
      [points[3], handles[1]],
    ]
      .forEach((pArr) => {
        const [from, to] = pArr;
        drawLine(from, to, "#999", 1);
      })

    // Drawing the bezier curve
    const p0 = points[1];
    const p1 = handles[0];
    const p2 = handles[1];
    const p3 = points[3];

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.bezierCurveTo(
      (p1.x), (p1.y),
      (p2.x), (p2.y),
      (p3.x), (p3.y),
    );
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 4 * scale;
    ctx.stroke();

    // Drawing the points
    const pointRadius = 24 * scale;
    for (let i = 0; i < points.length; i += 1) {
      const { x, y } = points[i];

      // White center
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();

      // Stroke
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, 2 * Math.PI, false);
      ctx.lineWidth = 8 * scale;
      ctx.strokeStyle = this.primaryColor;
      ctx.stroke();
    }
  }

  componentDidMount() {
    this.renderCanvas();
  }

  render() {
    return (
      <div className="project-container">
        <div className="page-content-container">
          <header className="project-header">
            <canvas className="project-header-canvas" id="bezier-header-canvas" />
          </header>
          <div className="project-content">
            <h1 style={{ color: this.primaryColor }}>
              Vector Networks
            </h1>
            <TechUsed items={["redux"]} />
            <p>
              My Javascript implementation of vector networks. Redux was used for state management but no other libraries were used.
            </p>
            <p>
              The project started as an exploration of bezier curves, and then developed into an exploration of how different graphics programs would go about implementing a vector editor.
            </p>
            <p>
              The project draws heavy inspiration from Figma’s vector editor which uses vector networks.
            </p>
            <img
              src="/images/vector-networks-example.png"
              alt=""
            />
            <p>
              The main features:
            </p>
            <ul>
              <li>History so you can undo and redo any action</li>
              <li>Connect any two points as many times as you want</li>
              <li>Split a connection into two connectings between three points without changing the path</li>
              <li>Associative selection (moving a connecting moves it’s points, moving a point moves it’s handles etc.)</li>
              <li>Creating a point allows you to hold down the mouse to drag out it’s handles in a mirror-like fashion.</li>
            </ul>
            <p style={{ marginTop: "4rem" }}>
              The controls are almost identical to most vector editors, but if you haven't used one before here is a quick primer.
            </p>
            <ul>
              <li>Undo: Ctrl + Z (Cmd + Z on Mac)</li>
              <li>Redo: Ctrl + Shift + Z (Cmd + Shift + Z on Mac)</li>
              <li>'p' for the pen tool</li>
              <li>'v' for the move tool</li>
              <li>Click on anything with the move tool to select it. If you hold shift down you can select and deselect multiple things at once and then you can move them together.</li>
              <li>When you create a point with the pen tool, you can hold the mouse down and drag out handles.</li>
              <li>When using the move tool, click on empty space to deselect everything</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Project(ProjectBezier, constants.projectColors.bezier);
