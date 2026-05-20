import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={MainVideo}
        durationInFrames={35 * 30} // 35 seconds * 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
