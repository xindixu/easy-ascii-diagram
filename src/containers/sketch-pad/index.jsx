import React, { Component } from "react";
import {
  TOOLS,
  COMMANDS,
  ACTIONS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH
} from "../../constants";

import Grid from "../../components/grid";
import Diagram from "../../components/diagram";
import ToolBar from "../toolbar";

class SketchPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 1,
      tool: TOOLS.arrow,
      content: [],
      future: []
    };
    this.result = null;
  }

  componentDidMount() {}

  addToResult = (x, y, text) => {
    let curX = x;
    let curY = y;
    let index = 0;
    while (index < text.length) {
      this.result[curY][curX] = text[index];

      if (text[index] === "\n") {
        curY += 1;
        curX = x;
      } else {
        curX += 1;
      }
      index += 1;
    }
  };

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
    const { content } = this.state;
    const { totalRow, totalColumn } = this.calculateTotalGridNumber();
    this.result = Array(totalRow)
      .fill()
      .map(() => Array(totalColumn));

    content.forEach(el => {
      let text = "";
      switch (el.type.shape) {
        case TOOLS.arrow:
          text = el.type.convert(el.props.direction, el.props.length);
          break;
        case TOOLS.line:
          text = el.type.convert(el.props.direction, el.props.length);
          break;
        case TOOLS.text:
          text = el.type.convert(el.props.content);
          break;
        case TOOLS.rectangle:
          text = el.type.convert(el.props.width, el.props.height);
          break;
        case TOOLS.eraser:
          text = el.type.convert(el.props.width, el.props.height);
          break;
        default:
          break;
      }
      this.addToResult(el.props.x, el.props.y, text);
    });
    console.log(this.result);

    switch (e.target.value) {
      case ACTIONS.export:
        break;
      case ACTIONS.save:
        break;
      default:
        break;
    }
  };

  calculateTotalGridNumber() {
    const { zoomLevel } = this.state;
    const totalRow = Math.floor(CANVAS_HEIGHT / zoomLevel);
    const totalColumn = Math.floor(CANVAS_WIDTH / zoomLevel);
    return { totalRow, totalColumn };
  }

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
