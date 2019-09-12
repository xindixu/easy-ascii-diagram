import React from "react";
import PropTypes from "prop-types";
import { TOOLS, COMMANDS, ACTIONS } from "../../constants";
import { Wrapper, Tool, Command, Action, IconButton } from "./style";

const Toolbar = ({
  currentTool,
  currentZoom,
  handleAction,
  handleCommand,
  handleTool
}) => (
  <Wrapper>
    <Tool>
      {Object.keys(TOOLS).map(key => (
        <IconButton
          onClick={handleTool}
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
        <IconButton onClick={handleCommand} key={key} value={COMMANDS[key]}>
          {COMMANDS[key]}
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
  handleCommand: PropTypes.func.isRequired,
  handleTool: PropTypes.func.isRequired
};

export default Toolbar;
