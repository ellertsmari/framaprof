import React from "react";
import Hoverable from "./Hoverable";

import constants from "../constants";

export default function TechUsed(props) {
  return (
    <div className="tech-used-container">
      <h6>TECH USED</h6>
      <ul>
        {
          props.items.map((item) => {
            const { url, icon, title } = constants.icons[item];
            return (
              <li key={item} className="hoverable">
                <Hoverable label={title} />
                <a
                  className="tech-used-item"
                  href={url}
                  alt={title}
                  style={{
                    backgroundImage: `url("/images/${icon}")`,
                  }}
                />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}