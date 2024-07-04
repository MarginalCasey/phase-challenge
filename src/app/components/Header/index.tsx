"use client";

import useToolbarStore, { Tool } from "@/hooks/useToolbarStore";
import { ElementType } from "@/types";
import {
  Button,
  Container,
  FrameIcon,
  RectangleIcon,
  SelectIcon,
  TextIcon,
} from "./index.style";

const Header = () => {
  const currentTool = useToolbarStore((state) => state.currentTool);
  const setCurrentTool = useToolbarStore((state) => state.setCurrentTool);

  function handleSelectTool(tool: Tool | ElementType) {
    return () => {
      setCurrentTool(tool);
    };
  }

  return (
    <Container>
      <Button
        $active={currentTool === Tool.Select}
        onClick={handleSelectTool(Tool.Select)}
      >
        <SelectIcon />
      </Button>
      <Button
        data-testid="add-frame"
        $active={currentTool === ElementType.Frame}
        onClick={handleSelectTool(ElementType.Frame)}
      >
        <FrameIcon />
      </Button>
      <Button
        $active={currentTool === ElementType.Rectangle}
        onClick={handleSelectTool(ElementType.Rectangle)}
      >
        <RectangleIcon />
      </Button>
      <Button
        $active={currentTool === ElementType.Text}
        onClick={handleSelectTool(ElementType.Text)}
      >
        <TextIcon />
      </Button>
    </Container>
  );
};

export default Header;
