import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import SketchPad from "./containers/sketch-pad";

const endpoint = "localhost:5000";
const socket = socketIOClient(endpoint);
class App extends Component {
  constructor() {
    super();
    this.state = {
      color: "white"
    };
  }

  componentDidMount = () => {
    socket.on("change color", color => {
      document.body.style.backgroundColor = color;
    });
  };

  // sending sockets
  send = () => {
    socket.emit("change color", this.state.color); // change 'red' to this.state.color
  };

  // adding the function
  setColor = color => {
    this.setState({ color });
  };

  render() {
    // testing for socket connections

    return (
      <>
        {/* <SketchPad /> */}
        <div style={{ textAlign: "center" }}>
          <button onClick={this.send}>Change Color</button>
          <button id="blue" onClick={() => this.setColor("blue")}>
            Blue
          </button>
          <button id="red" onClick={() => this.setColor("red")}>
            Red
          </button>
        </div>
      </>
    );
  }
}
export default App;
