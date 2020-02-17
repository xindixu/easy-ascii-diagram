import React, { useState } from "react";
import SketchPad from "./containers/sketch-pad";
import Welcome from "./containers/welcome";

function App() {
  const [collaboration, setCollaboration] = useState(false);
  return (
    <>
      <SketchPad collaboration={collaboration} />
      <Welcome setCollaboration={setCollaboration} />
    </>
  );
}

App.propTypes = {};

export default App;
