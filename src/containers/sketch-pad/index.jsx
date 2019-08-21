import React, { Component } from "react";
import { TOOLS, COMMANDS } from "../../constants";

import Grid from "../../components/grid";
import Diagram from "../../components/diagram";
import ToolBar from "../toolbar";

class SketchPad extends Component {
  state = {
    zoomLevel: 1,
    tool: TOOLS.arrow,
    content: [],
    future: []
  };

  componentDidMount() {}

  setDrawingTool = e => {
    this.setState({ tool: e.target.value });
  };

  setZoomLevel = zoom => {
    this.setState({ zoomLevel: zoom });
  };

  commitDrawing = shape => {
    const { content } = this.state;
    this.setState({
      content: [...content, shape]
    });
  };

  handleHistory = e => {
    const { content, future } = this.state;
    let present;
    switch (e.target.value) {
      case COMMANDS.undo:
        present = content.pop();
        future.unshift(present);
        this.setState({
          content,
          future
        });
        break;
      case COMMANDS.redo:
        present = future.shift();
        content.push(present);
        this.setState({
          content,
          future
        });
        break;
      default:
        break;
    }
  };

  handleAction = e => {
    console.log(e.target.value);
    let result = "";
    const { content } = this.state;
    content.forEach(el => {
      console.log(el);
      result += el.toString();
    });
    console.log(result);
  };

  render() {
    const { tool, zoomLevel, content } = this.state;
    return (
      <React.Fragment>
        <ToolBar
          currentTool={tool}
          currentZoom={zoomLevel}
          handleAction={this.handleAction}
          handleHistory={this.handleHistory}
          setTool={this.setDrawingTool}
          setZoom={this.setZoomLevel}
        />
        <Grid zoomLevel={zoomLevel} />
        <Diagram
          tool={tool}
          zoomLevel={zoomLevel}
          content={content}
          commitDrawing={this.commitDrawing}
        />
      </React.Fragment>
    );
  }
}

export default SketchPad;
