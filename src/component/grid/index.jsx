import React, { Component } from 'react';
import { GridBackground } from './style';

const GRID_HEIGHT = 32;
const GRID_WIDTH = 16;


class Grid extends Component {
  state = {
    zoomLevel: 1,
  }

  render() {
    const { zoomLevel } = this.state;
    return (
      <GridBackground width={GRID_WIDTH / zoomLevel} height={GRID_HEIGHT / zoomLevel} />
    );
  }
}

export default Grid;
