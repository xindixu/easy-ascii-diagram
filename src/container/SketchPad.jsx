import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../component/grid';
import ToolBar from '../component/toolbar';

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
      <React.Fragment>
        <ToolBar />
        <Grid />
      </React.Fragment>

    );
  }
}

SketchPad.propTypes = {

};

export default SketchPad;
