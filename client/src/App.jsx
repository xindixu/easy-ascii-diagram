import React from "react";
import SketchPad from "./containers/sketch-pad";
import Welcome from "./containers/welcome";

function App() {
  return (
    <>
      <SketchPad />
      <Welcome  />
    </>
  );
}

App.propTypes = {};

export default App;
