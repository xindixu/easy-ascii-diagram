import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GRID_HEIGHT, GRID_WIDTH } from '../../constants';
import { GridBackground } from './style';


class Grid extends Component {
  state = {
    zoomLevel: 1,
  }

  render() {
    const { zoomLevel } = this.state;
    const { onMouseDown, onMouseMove, onMouseUp } = this.props;
    return (
      <GridBackground width={GRID_WIDTH / zoomLevel} height={GRID_HEIGHT / zoomLevel} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} />
    );
  }
}

Grid.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
};
export default Grid;
