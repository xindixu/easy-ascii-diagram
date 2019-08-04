import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GRID_HEIGHT, GRID_WIDTH } from '../../constants';
import { GridBackground } from './style';

class Grid extends Component {
  state = {
  }

  render() {
    const {
      zoomLevel, onMouseDown, onMouseMove, onMouseUp,
    } = this.props;

    return (
      <GridBackground
        width={GRID_WIDTH / zoomLevel}
        height={GRID_HEIGHT / zoomLevel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />

    );
  }
}

Grid.defaultProps = {
  zoomLevel: 1,
};
Grid.propTypes = {
  onMouseDown: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  zoomLevel: PropTypes.number,
};
export default Grid;
