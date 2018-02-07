import animateFor from "./animateFor";
import getIntermediateNumber from "./getIntermediateNumber";
import constants from "../constants";

let canvas;
let ctx;

const distLeft = 16 * 4; // 4rem
const distRight = 16 * 6; // 6rem
const swing = 40;

const mDistUp = 16 * 0; // 2rem
const mDistDown = 16 * 3; // 4rem

let _backgroundColor = {
  r: 212,
  g: 23,
  b: 68,
};
const defaultColor = { ..._backgroundColor };

if (window.location.pathname.includes("/projects/")) {
  const { projectColors } = constants;
  const keys = Object.keys(projectColors);
  for (let i = 0; i < keys.length; i += 1) {
    if (window.location.pathname === `/projects/${keys[i]}`) {
      _backgroundColor = projectColors[keys[i]];
    }
  }
}

let _isOpen = window.location.pathname === "/";
let f = _isOpen ? 0 : 1;

const animate = () => {
  requestAnimationFrame(animate);

  if (!canvas || !ctx) {
    canvas = document.getElementById("background-canvas");
    if (canvas) {
      ctx = canvas.getContext("2d");
    } else {
      return;
    }
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  /**
   * Making sure that the width and height of canvas
   * match the screen size.
   */
  if (canvas.getAttribute("width") !== width) {
    canvas.setAttribute("width", width + "px");
  }

  if (window.innerWidth <= constants.mobile) {
    const mHeight = Math.min(height, (64 + height * (1 - f)))
    canvas.setAttribute("height", mHeight + "px");
    canvas.style.height = mHeight + "px";
  } else if (canvas.getAttribute("height") !== height) {
    canvas.setAttribute("height", height + "px");
    canvas.style.height = height + "px";
  }

  ctx.clearRect(0, 0, width, height);

  // Setting the fill color
  ctx.fillStyle = `rgb(${
    "rgb"
      .split("")
      .map(part => _backgroundColor[part])
      .join(",")
    })`;

  // Filling the screen with color
  ctx.fillRect(0, 0, width, height);

  const nBars = 10;

  if (window.innerWidth > constants.mobile) {
    for (let i = 0; i < nBars; i += 1) {
      const offset = (Date.now() / 750) + (i / 3);
      const startAt = Math.floor(f * (width - distRight)) - Math.floor(f * distRight);
      const widthToClear = distLeft + Math.floor(Math.sin(offset) * (swing * (1 - (f * .75))));
      ctx.clearRect(
        0,
        height / nBars * i,
        startAt + widthToClear,
        height / nBars,
      );
    }
  } else {
    const mSwing = window.innerHeight / 20;

    for (let i = 0; i < nBars; i += 1) {
      const offset = (Date.now() / 750) + (i / 3);
      const startAt = Math.floor(f * (height - 120)) - Math.floor(f * mDistUp);
      const heightToClear = mDistDown + Math.floor(Math.sin(offset) * (mSwing * (1 - (f * .75))) * (1 - f)) + startAt;
      ctx.clearRect(
        width / nBars * i,
        height - heightToClear,
        width / nBars,
        heightToClear,
      );
    }
  }

};
animate();

const changeF = (x) => {
  f = x;
};

let cancel;

export function openBackground() {
  _isOpen = true;
  if (cancel) { cancel(); }

  cancel = animateFor(changeF, {
    from: f,
    to: 0,
    duration: 750,
  });
}

export function closeBackground() {
  _isOpen = false;
  if (cancel) { cancel(); }

  cancel = animateFor(changeF, {
    from: f,
    to: 1,
    duration: 500,
  });
}

export function changeBackgroundColor(color) {
  _backgroundColor = color;
}

export function getBackgroundColor() {
  return _backgroundColor;
}

let colorCancel;

/**
 * @param color - If omitted, animates to the default color
 */
export function animateToColor(color = defaultColor) {
  if (colorCancel) { colorCancel(); }

  const current = { ..._backgroundColor };

  colorCancel = animateFor((f) => {
    _backgroundColor = "rgb"
      .split("")
      .map(key => ({
        key,
        value: getIntermediateNumber(current[key], color[key], f),
      }))
      .reduce((newColorObj, { key, value }) => ({
        ...newColorObj,
        [key]: Math.round(value),
      }), {});
  }, colorCancel);
}

export function isOpen() {
  return _isOpen;
}
