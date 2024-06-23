import usePageStore from "@/hooks/usePageStore";
import { Application } from "pixi.js";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Element from "./Element";

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
`;

const Canvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setStage = usePageStore((state) => state.setStage);
  const page = usePageStore((state) => state.page);

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

  return (
    <CanvasWrapper ref={wrapperRef}>
      {page.map((element) => (
        <Element key={element.id} path={`/${element.id}`} {...element} />
      ))}
    </CanvasWrapper>
  );
};

export default Canvas;
