import usePageStore from "@/hooks/usePageStore";
import useToolbarStore, { Tool } from "@/hooks/useToolbarStore";
import type { Application } from "pixi.js";
import { useEffect } from "react";

const useTranslate = (app: Application | null) => {
  const activeElementPath = usePageStore((state) => state.activeElementPath);
  const currentTool = useToolbarStore((state) => state.currentTool);

  useEffect(() => {
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    function onDragStart(event: MouseEvent) {
      if (activeElementPath !== null) return;
      if (!app) return;

      isDragging = true;
      prevX = event.clientX;
      prevY = event.clientY;
    }

    function onDragMove(event: MouseEvent) {
      if (!app || !isDragging) return;

      app.stage.position.set(
        app.stage.position.x + event.clientX - prevX,
        app.stage.position.y + event.clientY - prevY,
      );

      prevX = event.clientX;
      prevY = event.clientY;
    }

    function onDragEnd() {
      isDragging = false;
    }

    if (app && currentTool === Tool.Select) {
      app.canvas.addEventListener("pointerdown", onDragStart);
      app.canvas.addEventListener("pointermove", onDragMove);
      app.canvas.addEventListener("pointerup", onDragEnd);

      return () => {
        app.canvas.removeEventListener("pointerdown", onDragStart);
        app.canvas.removeEventListener("pointermove", onDragMove);
        app.canvas.removeEventListener("pointerup", onDragEnd);
      };
    }
  }, [app, currentTool, activeElementPath]);
};

export default useTranslate;
