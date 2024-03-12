import React from "react";

import videoBg from "../assets/background.mp4";
import "../index.css";

export default function BackgroundVideo() {
  return (
    <div>
      <video loop autoPlay muted id="bg-video">
        <source src={videoBg} type="video/mp4"></source>
      </video>
    </div>
  );
}
