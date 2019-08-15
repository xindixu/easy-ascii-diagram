import React from 'react';
import PropTypes from 'prop-types';
import {
  TOOLS, COMMANDS, ZOOM, ACTIONS,
} from '../../constants';
import {
  Wrapper, Tool, Command, Action, IconButton,
} from './style';

const Toolbar = ({
  setTool, setZoom, currentTool, currentZoom,
}) => (
  <Wrapper>
    <Tool>{Object.keys(TOOLS).map(key => <IconButton onClick={setTool} key={key} value={TOOLS[key]} active={currentTool === TOOLS[key]}>{TOOLS[key]}</IconButton>)}</Tool>
    <Command>
      {Object.keys(COMMANDS).map(key => <IconButton key={key}>{COMMANDS[key]}</IconButton>)}
      {Object.keys(ZOOM).map(key => <IconButton key={key} value={ZOOM[key]}>{ZOOM[key]}</IconButton>)}
    </Command>
    <Action>{Object.keys(ACTIONS).map(key => <IconButton key={key}>{ACTIONS[key]}</IconButton>)}</Action>
  </Wrapper>
);

Toolbar.propTypes = {
  setTool: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  currentTool: PropTypes.oneOf([...Object.values(TOOLS)]).isRequired,
  currentZoom: PropTypes.number.isRequired,
};

export default Toolbar;
