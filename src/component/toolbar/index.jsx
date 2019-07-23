import React from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper, Tool, Command, Action,
} from './style';

const TOOLS = [
  'RECTANGLE',
  'LINE',
  'ARROW',
  'TEXT',
  'ERASER',
];

const COMMANDS = [
  'ZOOM_IN',
  'ZOOM_OUT',
  'UNDO',
  'REDO',
];

const ACTIONS = [
  'EXPORT',
  'SAVE',
];

const Toolbar = () => (
  <Wrapper>
    <Tool>{TOOLS.map(el => <span key={el}>{el}</span>)}</Tool>
    <Command>{COMMANDS.map(el => <span key={el}>{el}</span>)}</Command>
    <Action>{ACTIONS.map(el => <span key={el}>{el}</span>)}</Action>

  </Wrapper>
);

Toolbar.propTypes = {

};

export default Toolbar;
