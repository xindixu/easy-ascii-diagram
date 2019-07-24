import React from 'react';
import PropTypes from 'prop-types';
import { TOOLS, COMMANDS, ACTIONS } from '../../constants';
import {
  Wrapper, Tool, Command, Action, IconButton,
} from './style';

const Toolbar = () => (
  <Wrapper>
    <Tool>{TOOLS.map(el => <IconButton key={el}>{el}</IconButton>)}</Tool>
    <Command>{COMMANDS.map(el => <IconButton key={el}>{el}</IconButton>)}</Command>
    <Action>{ACTIONS.map(el => <IconButton key={el}>{el}</IconButton>)}</Action>

  </Wrapper>
);

Toolbar.propTypes = {

};

export default Toolbar;
