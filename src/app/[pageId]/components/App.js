"use client";

import styled from "styled-components";
import Canvas from "./Canvas";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const AppWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 240px auto 240px;
  background: #232323;
  height: 100vh;
  color: white;
`;
const App = () => {
  return (
    <AppWrapper>
      <LeftPanel />
      <Canvas />
      <RightPanel />
    </AppWrapper>
  );
};

export default App;
