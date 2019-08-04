import React from 'react';
import PropTypes from 'prop-types';
import { TOOLS, COMMANDS, ACTIONS } from '../../constants';
import {
  Wrapper, Tool, Command, Action, IconButton,
} from './style';

const Toolbar = () => (
  <Wrapper>
    <Tool>{Object.keys(TOOLS).map(key => <IconButton key={key}>{TOOLS[key]}</IconButton>)}</Tool>
    <Command>{Object.keys(COMMANDS).map(key => <IconButton key={key}>{COMMANDS[key]}</IconButton>)}</Command>
    <Action>{Object.keys(ACTIONS).map(key => <IconButton key={key}>{ACTIONS[key]}</IconButton>)}</Action>

  </Wrapper>
);

Toolbar.propTypes = {

};

export default Toolbar;
