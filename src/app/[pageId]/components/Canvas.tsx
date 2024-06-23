"use client";

import usePageStore from "@/hooks/usePageStore";
import useToolbarStore, { Tool } from "@/hooks/useToolbarStore";
import { Application } from "pixi.js";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Element from "./Element";
import useAddElement from "./Element/hooks/useAddElement";

const CanvasWrapper = styled.div<{ $addElement: boolean }>`
  cursor: ${(props) => (props.$addElement ? "crosshair" : "default")};
`;

const Canvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stage = usePageStore((state) => state.stage);
  const setStage = usePageStore((state) => state.setStage);
  const page = usePageStore((state) => state.page);

  const currentTool = useToolbarStore((state) => state.currentTool);

  useEffect(() => {
    const app = new Application();

    async function init(wrapper: HTMLDivElement) {
      await app.init({
        resizeTo: wrapper,
        backgroundColor: "#f2f2f2",
        eventMode: "static",
      });
      wrapper.appendChild(app.canvas);
      app.stage.hitArea = app.screen;
      setStage(app.stage);
    }

    if (wrapperRef.current) {
      init(wrapperRef.current);

      return () => {
        wrapperRef.current?.removeChild(app.canvas);
        app.destroy();
      };
    }
  }, [setStage]);

  useAddElement({ container: stage, path: null });

  return (
    <CanvasWrapper ref={wrapperRef} $addElement={currentTool !== Tool.Select}>
      {page.map((element) => (
        <Element key={element.id} path={`/${element.id}`} {...element} />
      ))}
    </CanvasWrapper>
  );
};

export default Canvas;
