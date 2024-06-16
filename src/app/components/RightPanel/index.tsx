import styled from "styled-components";
import ColorPicker from "../ColorPicker";
import useActiveElement from "./hooks/useActiveElement";

const RightPanelWrapper = styled.div`
  padding: 8px;
`;
const Label = styled.label`
  display: grid;
  grid-template-columns: 16px auto minmax(0, 1fr);
  grid-gap: 8px;
`;

const RightPanel = () => {
  const element = useActiveElement();

  return (
    <RightPanelWrapper>
      {element && (
        <>
          <Label>
            X <input type="number" min={0} max={999} value={element.x} />
          </Label>
          <Label>
            Y <input type="number" min={0} max={999} value={element.y} />
          </Label>
          <Label>
            O{" "}
            <input
              type="number"
              min={0}
              max={100}
              value={element.alpha * 100}
            />
            <input type="range" min={0} max={100} value={element.alpha * 100} />
          </Label>
          <Label>
            B <ColorPicker /> #00FF00
          </Label>
        </>
      )}
    </RightPanelWrapper>
  );
};

export default RightPanel;
