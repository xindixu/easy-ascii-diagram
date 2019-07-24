import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '../../component/grid';
import ToolBar from '../toolbar';

const userStrokeStyle = '#EE92C2';
const guestStrokeStyle = '#F0C987';

class SketchPad extends Component {
    state = {
      isDrawing: false,
      content: [],
      tool: '',
      prevPos: { x: null, y: null },
      curPos: { x: null, y: null },
    };


  handleMouseDown = (e) => {
    this.setState({
      isDrawing: true,
      prevPos: { x: e.clientX, y: e.clientY },
    });
  }

  handleMouseMove = (e) => {
    this.setState({
      curPos: { x: e.clientX, y: e.clientY },
    });
  }

  handleMouseUp = (e) => {
    this.setState({
      isDrawing: false,
    });
  }


  render() {
    const { prevPos, curPos } = this.state;
    return (
      <React.Fragment>
        <ToolBar />
        <Grid
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      </React.Fragment>

    );
  }
}

SketchPad.propTypes = {

};

export default SketchPad;
