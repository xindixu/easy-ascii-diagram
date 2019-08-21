import React, { Component } from "react";
import { TOOLS, COMMANDS, ACTIONS } from "../../constants";

import Grid from "../../components/grid";
import Diagram from "../../components/diagram";
import ToolBar from "../toolbar";
import Arrow from "../../lib/arrow";

class SketchPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 1,
      tool: TOOLS.arrow,
      content: [],
      future: []
    };
  }

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
    const result = [];
    const { content } = this.state;
    console.log(content);
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
        default:
          break;
      }

      result.push(text);
    });
    console.log(result);

    switch (e.target.value) {
      case ACTIONS.export:
        break;
      case ACTIONS.save:
        break;
      default:
        break;
    }
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
          setRef={this.setRef}
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
