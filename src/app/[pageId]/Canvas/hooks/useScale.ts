import type { Application } from "pixi.js";
import { Point } from "pixi.js";
import { useEffect } from "react";

const useScale = (app: Application | null) => {
  useEffect(() => {
    function handleWheel(event: WheelEvent) {
      if (!app) return;

      const mousePos = new Point(event.offsetX, event.offsetY);
      const mousePosToLocal = app.stage.toLocal(mousePos);

      const scale = app.stage.scale.x;
      const newScale = scale - event.deltaY * 0.001;

      app.stage.scale.set(newScale);

      const newMousePosToLocal = app.stage.toLocal(mousePos);

      app.stage.position.set(
        app.stage.position.x +
          (newMousePosToLocal.x - mousePosToLocal.x) * newScale,
        app.stage.position.y +
          (newMousePosToLocal.y - mousePosToLocal.y) * newScale,
      );
    }

    if (app) {
      app.canvas.addEventListener("wheel", handleWheel);

      return () => {
        app.canvas.removeEventListener("wheel", handleWheel);
      };
    }
  }, [app]);
};

export default useScale;
