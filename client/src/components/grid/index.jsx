import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GRID_HEIGHT, GRID_WIDTH } from '../../constants';
import { GridBackground } from './style';

class Grid extends Component {
  state = {
  }

  render() {
    const { zoomLevel } = this.props;

    return (
      <GridBackground
        width={GRID_WIDTH / zoomLevel}
        height={GRID_HEIGHT / zoomLevel}
      />

    );
  }
}

Grid.defaultProps = {
  zoomLevel: 1,
};
Grid.propTypes = {
  zoomLevel: PropTypes.number,
};
export default Grid;
