import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../component/grid';

const userStrokeStyle = '#EE92C2';
const guestStrokeStyle = '#F0C987';

class SketchPad extends Component {
  state = {
    isDrawing: false,
    content: [],
    tools: {},
    previousPosition: { offsetX: 0, offsetY: 0 },
  };

  render() {
    return (
      <div>
        <Grid />
        <p> Start to draw</p>
      </div>
    );
  }
}

SketchPad.propTypes = {

};

export default SketchPad;
