import BezierEasing from "bezier-easing";

import getIntermediateNumber from "./getIntermediateNumber";

const defaultOpts = {
  from: 0,
  to: 1,
  duration: 500,
  bezier: [.46,.19,.13,.98],
  callback: null,
};


export default function animateFor(func, options = defaultOpts, cb) {
  const opts = {
    ...defaultOpts,
    ...options,
  };

  let cancelled = false;

  const easing = BezierEasing(...opts.bezier);
  const startTime = Date.now();

  let f = opts.from;
  const animate = () => {
    const actualF = (Date.now() - startTime) / opts.duration;
    f = easing(actualF);

    if (cancelled) { return f; }

    if (actualF > 1) {
      f = 1;
    } else {
      requestAnimationFrame(animate);
    }

    func(getIntermediateNumber(opts.from, opts.to, f));

    if (f === 1 && typeof cb === "function") {
      cb();
    }
  };
  animate();

  return () => {
    cancelled = true;
    return f;
  };
}