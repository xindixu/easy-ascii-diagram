/* eslint-disable no-case-declarations */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce, isEqual, findIndex, findLastIndex } from "lodash";

import {
  TOOLS,
  COMMANDS,
  ACTIONS,
  TOOLBAR_HEIGHT,
  EDITOR_COMMAND,
  TRANSACTION,
  DIRECTION_HORIZONTAL
} from "../../constants";
import withSocket from "../../hoc/withSocket";
import Grid from "../../components/grid";
import Diagram from "../../components/diagram";
import PopUp from "../../components/pop-up";
import ToolBar from "../toolbar";
import Transaction from "../../lib/transaction";
import { drawShape } from "../../lib/draw";
import { TextArea, Border, Debug } from "./style";
import { selectAndCopy } from "../../util";

const calculateTotalGridNumber = zoomLevel => {
  const totalRow = Math.floor(
    (window.innerHeight - TOOLBAR_HEIGHT) / zoomLevel
  );
  const totalColumn = Math.floor(window.innerWidth / zoomLevel);
  return { totalRow, totalColumn };
};

const isOverlapped = (targetNode, otherNode) => {
  const { state: target } = targetNode.ref.current;
  const { state: other } = otherNode.ref.current;

  if (
    target.x + target.width >= other.x &&
    target.x <= other.x + other.width &&
    target.y + target.height >= other.y &&
    target.y <= other.y + other.height
  ) {
    return true;
  }

  return false;
};

class SketchPad extends Component {
  constructor(props) {
    super(props);

    const zoomLevel = 1;
    const { totalRow, totalColumn } = calculateTotalGridNumber(zoomLevel);

    this.state = {
      zoomLevel,
      tool: TOOLS.arrow,
      isEditing: false,
      content: [],
      past: [],
      future: [],
      showPopUp: false,
      resultText: "",
      border: {
        up: totalRow,
        down: 0,
        left: totalColumn,
        right: 0
      }
    };
    this.result = null;
    this.nodes = new Map();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const { txFromServer: tx } = this.props;

    const { content } = this.state;
    if (!isEqual(prevProps.txFromServer, tx)) {
      switch (tx.type) {
        case TRANSACTION.create:
          const ref = React.createRef();
          const sharedProps = {
            enterEditMode: this.enterEditMode,
            exitEditMode: this.exitEditMode,
            commitEditing: this.commitEditing,
            handleFloatingMenu: this.handleFloatingMenu
          };
          const shape = drawShape({
            ...sharedProps,
            ...tx.newState,
            ref,
            key: tx.id
          });
          const drawing = { shape, id: tx.id, ref };
          this.commitDrawing(drawing, false);
          break;
        case TRANSACTION.edit:
          {
            const target = this.nodes.get(tx.id);
            target.current.updateWithState(tx.newState);
            this.commitEditing(target.current, tx.oldState, tx.newState, false);
          }
          break;
        case TRANSACTION.delete:
          const index = content.findIndex(el => el.props.id === tx.id);
          this.commitDeleting(index, false);
          break;
        default:
          break;
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  enterEditMode = () => {
    this.setState({
      isEditing: true
    });
  };

  exitEditMode = () => {
    this.setState({
      isEditing: false
    });
  };

  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  addToResult = (x, y, text) => {
    const { border } = this.state;
    let curX = x - border.left;
    let curY = y - border.up;
    let index = 0;
    while (index < text.length) {
      if (text[index] === "\n") {
        curY += 1;
        curX = x - border.left;
      } else {
        curX += 1;
        this.result[curY][curX] = text[index];
      }
      index += 1;
    }
  };

  closePopUp = e => {
    this.setState({ showPopUp: false });
  };

  setZoomLevel = zoom => {
    this.setState({ zoomLevel: zoom });
  };

  commitDrawing = (drawing, log = true) => {
    const { content, past } = this.state;
    const { shape, id, ref } = drawing;
    const { props } = shape;
    const { collaboration, sendTxToServer } = this.props;

    this.nodes.set(id, ref);

    this.updateBorder(props);
    this.setState({
      content: [...content, shape]
    });

    if (collaboration && log) {
      const tx = new Transaction(
        TRANSACTION.create,
        id,
        props.shape,
        null,
        props
      );
      this.setState({
        past: [...past, tx]
      });
      sendTxToServer(tx);
    }
  };

  commitEditing = (target, oldState, newState, log = true) => {
    const { id } = newState;
    const { past } = this.state;
    const { collaboration, sendTxToServer } = this.props;
    this.updateBorder(newState);

    if (collaboration && log) {
      const tx = new Transaction(
        TRANSACTION.edit,
        id,
        target.shape,
        oldState,
        newState
      );
      this.setState({
        past: [...past, tx]
      });
      sendTxToServer(tx);
    }
  };

  commitDeleting = (targetIndex, log = true) => {
    const { past, content } = this.state;
    const shape = content[targetIndex];
    const { props } = shape;
    const { collaboration, sendTxToServer } = this.props;

    this.nodes.delete(props.id);
    this.updateBorder(props);

    this.setState({
      content: [
        ...content.slice(0, targetIndex),
        ...content.slice(targetIndex + 1, content.length)
      ]
    });

    if (collaboration && log) {
      const tx = new Transaction(
        TRANSACTION.delete,
        props.id,
        props.shape,
        props,
        null
      );
      this.setState({
        past: [...past, tx]
      });
      sendTxToServer(tx);
    }
  };

  updateBorder = ({ x, y, height, width, length, direction }) => {
    let calHeight;
    let calWidth;
    if (direction) {
      if (Object.values(DIRECTION_HORIZONTAL).includes(direction)) {
        calHeight = 1;
        calWidth = length;
      } else {
        calHeight = length;
        calWidth = 1;
      }
    }

    const borderBuffer = {
      up: y,
      down: y + height || y + calHeight,
      left: x,
      right: x + width || x + calWidth
    };

    const { border } = this.state;
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
    this.setState({
      border: newBorder
    });
  };

  handleResize = () =>
    debounce(() => {
      const { zoomLevel } = this.state;
      calculateTotalGridNumber(zoomLevel);
    }, 500);

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

  handleCommand = e => {
    const { content, future, past } = this.state;
    let shape;
    let tx;
    let target;
    let newContent;
    let newFuture;
    let newPast;

    switch (e.target.value) {
      case COMMANDS.undo:
        tx = past[past.length - 1];
        newPast = past.slice(0, -1);
        if (tx) {
          future.unshift(tx);
          switch (tx.type) {
            case TRANSACTION.create:
              newContent = content.slice(0, -1);
              this.nodes.delete(tx.id);
              break;
            case TRANSACTION.edit:
              target = this.nodes.get(tx.id);
              target.current.updateWithState(tx.oldState);
              break;
            case TRANSACTION.delete:
              const ref = React.createRef();
              shape = drawShape({ ...tx.oldState, ref, key: tx.id });
              this.nodes.set(tx.id, ref);
              newContent = [...content, shape];
              break;
            default:
              break;
          }
        }

        this.setState({
          content: newContent || content,
          future: newFuture || future,
          past: newPast || past
        });
        break;
      case COMMANDS.redo:
        tx = future[0];
        newFuture = future.slice(1);
        if (tx) {
          past.push(tx);

          switch (tx.type) {
            case TRANSACTION.create:
              const ref = React.createRef();
              shape = drawShape({ ...tx.newState, ref, key: tx.id });
              this.nodes.set(tx.id, ref);
              newContent = [...content, shape];
              break;
            case TRANSACTION.edit:
              target = this.nodes.get(tx.id);
              target.current.updateWithState(tx.newState);
              break;
            case TRANSACTION.delete:
              newContent = content.slice(0, -1);
              this.nodes.delete(tx.id);
              break;
            default:
              break;
          }
        }

        this.setState({
          content: newContent || content,
          future: newFuture || future,
          past: newPast || past
        });
        break;
      case COMMANDS.zoomIn:
        break;
      case COMMANDS.zoomOut:
        break;
      default:
        break;
    }
  };

  handleTool = e => {
    this.setState({ tool: e.target.value });
  };

  handleFloatingMenu = (e, id) => {
    e.stopPropagation();
    const { content } = this.state;
    const targetIndex = content.findIndex(el => el.key === id);
    const target = content[targetIndex];

    switch (e.target.value) {
      case EDITOR_COMMAND.moveUp:
        {
          // [..., targetIndex, ..., overlapElementIndex, ...]
          const overlapElementIndex = findIndex(
            content,
            element => {
              if (element.key === id) {
                return false;
              }
              return !!isOverlapped(target, element);
            },
            targetIndex
          );

          if (overlapElementIndex < 0) {
            return;
          }
          // [..., ..., overlapElementIndex, targetIndex, ...]
          const newContent = [
            ...content.slice(0, targetIndex),
            ...content.slice(targetIndex + 1, overlapElementIndex),
            content[overlapElementIndex],
            target,
            ...content.slice(overlapElementIndex + 1)
          ];
          this.setState({
            content: newContent
          });
        }
        break;

      case EDITOR_COMMAND.moveDown:
        {
          // [..., overlapElementIndex, ..., targetIndex, ...]
          const overlapElementIndex = findLastIndex(
            content,
            element => {
              if (element.key === id) {
                return false;
              }
              return !!isOverlapped(target, element);
            },
            targetIndex
          );

          if (overlapElementIndex < 0) {
            return;
          }

          // [..., targetIndex, overlapElementIndex, ..., ...]
          const newContent = [
            ...content.slice(0, overlapElementIndex),
            target,
            content[overlapElementIndex],
            ...content.slice(overlapElementIndex + 1, targetIndex),
            ...content.slice(targetIndex + 1)
          ];
          this.setState({
            content: newContent
          });
        }
        break;
      case EDITOR_COMMAND.delete:
        this.commitDeleting(targetIndex);
        break;
      default:
        break;
    }
  };

  export() {
    const { content, border } = this.state;
    const rows = border.down - border.up <= 0 ? 0 : border.down - border.up;
    const cols =
      border.right - border.left <= 0 ? 0 : border.right - border.left;
    this.result = Array(rows)
      .fill(" ")
      .map(() => Array(cols).fill(" "));

    content.forEach(el => {
      const { state } = el.ref.current;
      this.addToResult(state.x, state.y, state.text);
    });
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
      border,
      isEditing
    } = this.state;

    const { txFromServer } = this.props;
    return (
      <React.Fragment>
        <ToolBar
          currentTool={tool}
          currentZoom={zoomLevel}
          handleAction={this.handleAction}
          handleCommand={this.handleCommand}
          handleTool={this.handleTool}
        />
        <Grid zoomLevel={zoomLevel} />
        <Border
          up={border.up}
          left={border.left}
          right={border.right}
          down={border.down}
        />
        <Diagram
          tool={tool}
          zoomLevel={zoomLevel}
          isEditing={isEditing}
          content={content}
          enterEditMode={this.enterEditMode}
          exitEditMode={this.exitEditMode}
          commitDrawing={this.commitDrawing}
          commitEditing={this.commitEditing}
          updateBorder={this.updateBorder}
          handleFloatingMenu={this.handleFloatingMenu}
          txFromServer={txFromServer}
        />
        {showPopUp ? (
          <PopUp
            closePopUp={this.closePopUp}
            header="Click to copy, paste it into doc with a monospace font"
          >
            <TextArea
              onClick={selectAndCopy}
              readOnly
              rows="20"
              cols="80"
              value={resultText}
            />
          </PopUp>
        ) : null}
      </React.Fragment>
    );
  }
}

SketchPad.defaultProps = {
  txFromServer: null
};

SketchPad.propTypes = {
  sendTxToServer: PropTypes.func.isRequired,
  txFromServer: PropTypes.shape({
    user: PropTypes.string,
    transaction: PropTypes.object
  }),
  collaboration: PropTypes.bool.isRequired
};

export default withSocket(SketchPad);
