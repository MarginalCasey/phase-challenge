import { Application } from "pixi.js";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const CanvasWrapper = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
`;

const Canvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application();

    async function init(wrapper: HTMLDivElement) {
      await app.init({
        resizeTo: wrapper,
        backgroundColor: "#f2f2f2",
      });
      wrapper.appendChild(app.canvas);
    }

    if (wrapperRef.current) {
      init(wrapperRef.current);

      return () => {
        wrapperRef.current?.removeChild(app.canvas);
        app.destroy();
      };
    }
  }, []);

  return <CanvasWrapper ref={wrapperRef}></CanvasWrapper>;
};

export default Canvas;
