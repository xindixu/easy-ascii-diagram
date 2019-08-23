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
import PopUp from "../../components/pop-up";
import ToolBar from "../toolbar";

import { TextArea, Border } from "./style";

class SketchPad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoomLevel: 1,
      tool: TOOLS.arrow,
      content: [],
      future: [],
      showPopUp: false,
      resultText: "",
      border: {
        up: 0,
        down: 0,
        left: 0,
        right: 0
      }
    };
    this.result = null;
  }

  componentDidMount() {
    const { totalRow, totalColumn } = this.calculateTotalGridNumber();
    this.state = {
      ...this.state,
      border: {
        up: totalRow,
        down: 0,
        left: totalColumn,
        right: 0
      }
    };
  }

  addToResult = (x, y, text) => {
    const { border } = this.state;
    let curX = x - border.left;
    let curY = y - border.up;
    let index = 0;
    while (index < text.length) {
      if (text[index] === "\n") {
        curY += 1;
        curX = x;
      } else {
        curX += 1;
        console.log(curY, curX);
        this.result[curY][curX] = text[index];
      }
      index += 1;
    }
  };

  closePopUp = e => {
    this.setState({ showPopUp: false });
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

  updateBorder = borderBuffer => {
    const { border } = this.state;
    console.log(borderBuffer);
    const newUp = borderBuffer.up < border.up ? borderBuffer.up : border.up;
    const newLeft =
      borderBuffer.left < border.left ? borderBuffer.left : border.left;
    const newDown =
      borderBuffer.down > border.down ? borderBuffer.down : border.down;
    const newRight =
      borderBuffer.right > border.right ? borderBuffer.right : border.right;
    const newBorder = {
      up: newUp,
      down: newDown,
      left: newLeft,
      right: newRight
    };
    console.log("newBorder", newBorder);

    this.setState({
      border: newBorder
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
    switch (e.target.value) {
      case ACTIONS.export:
        this.export();
        break;
      case ACTIONS.save:
        break;
      default:
        break;
    }
  };

  selectAndCopy = e => {
    e.target.focus();
    e.target.select();
    document.execCommand("copy");
  };

  calculateTotalGridNumber() {
    const { zoomLevel } = this.state;
    const totalRow = Math.floor(CANVAS_HEIGHT / zoomLevel);
    const totalColumn = Math.floor(CANVAS_WIDTH / zoomLevel);
    return { totalRow, totalColumn };
  }

  export() {
    const { content, border } = this.state;
    console.log("rows", border.down - border.up);
    console.log("cols", border.right - border.left);
    this.result = Array(border.down - border.up)
      .fill(" ")
      .map(() => Array(border.right - border.left).fill(" "));
    console.log(this.result);
    // const bottom = 0;
    // const right = 0;
    // let left = totalColumn;
    // const top = totalRow;
    // for (let y = 0; y < this.result.length; y += 1) {
    //   for (let x = 0; y < this.result[y].length; x += 1) {
    //     const lineLeft = this.result[y].find(value => /w/.test(value));
    //     if (lineLeft < left) {
    //       left = lineLeft;
    //     }
    //   }
    // }

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
    const resultText = this.result.map(arr => arr.join("")).join("\n");

    this.setState({ showPopUp: true, resultText });
  }

  render() {
    const {
      tool,
      zoomLevel,
      content,
      showPopUp,
      resultText,
      border
    } = this.state;
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
          updateBorder={this.updateBorder}
        />
        <Border
          up={border.up}
          left={border.left}
          right={border.right}
          down={border.down}
        />
        {showPopUp ? (
          <PopUp
            closePopUp={this.closePopUp}
            header="Click to copy, paste it into doc with a monospace font"
          >
            <TextArea onClick={this.selectAndCopy} rows="20" cols="80">
              {resultText}
            </TextArea>
          </PopUp>
        ) : null}
      </React.Fragment>
    );
  }
}

export default SketchPad;
