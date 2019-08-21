import React from "react";
import PropTypes from "prop-types";
import { TOOLS, COMMANDS, ZOOM, ACTIONS } from "../../constants";
import { Wrapper, Tool, Command, Action, IconButton } from "./style";

const Toolbar = ({
  currentTool,
  currentZoom,
  handleAction,
  handleHistory,
  setTool,
  setZoom
}) => (
  <Wrapper>
    <Tool>
      {Object.keys(TOOLS).map(key => (
        <IconButton
          onClick={setTool}
          key={key}
          value={TOOLS[key]}
          active={currentTool === TOOLS[key]}
        >
          {TOOLS[key]}
        </IconButton>
      ))}
    </Tool>
    <Command>
      {Object.keys(COMMANDS).map(key => (
        <IconButton onClick={handleHistory} key={key} value={COMMANDS[key]}>
          {COMMANDS[key]}
        </IconButton>
      ))}
      {Object.keys(ZOOM).map(key => (
        <IconButton key={key} value={ZOOM[key]}>
          {ZOOM[key]}
        </IconButton>
      ))}
    </Command>
    <Action>
      {Object.keys(ACTIONS).map(key => (
        <IconButton onClick={handleAction} key={key} value={ACTIONS[key]}>
          {ACTIONS[key]}
        </IconButton>
      ))}
    </Action>
  </Wrapper>
);

Toolbar.propTypes = {
  currentTool: PropTypes.oneOf([...Object.values(TOOLS)]).isRequired,
  currentZoom: PropTypes.number.isRequired,
  handleAction: PropTypes.func.isRequired,
  handleHistory: PropTypes.func.isRequired,
  setTool: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired
};

export default Toolbar;
