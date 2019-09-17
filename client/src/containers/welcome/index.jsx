import React, { Component } from "react";
import PropTypes from "prop-types";
import PopUp from "../../components/pop-up";
import { randomId, selectAndCopy } from "../../util";
import { Button, Input } from "./styles";

class Welcome extends Component {
  state = {
    popUpClosed: false,
    inputRoom: "",
    newRoom: ""
  };

  componentDidMount() {}

  closePopUp = () => {
    this.setState({ popUpClosed: true });
  };

  createNewRoom = () => {
    const newRoom = randomId("RM");
    this.setState({ newRoom });
  };

  handleInputChange = e => {
    this.setState({ inputRoom: e.target.value });
  };

  render() {
    const { popUpClosed, inputRoom, newRoom } = this.state;
    return (
      <>
        {popUpClosed || (
          <PopUp
            closePopUp={this.closePopUp}
            header="Enter room code to start collaborating!"
          >
            <Input
              type="string"
              value={inputRoom}
              onChange={e => this.handleInputChange(e)}
            />

            <Button type="submit">Join the Room</Button>
            <Button type="primary" onClick={this.createNewRoom}>
              Create a Room
            </Button>
            {newRoom && (
              <Input type="string" value={newRoom} onClick={selectAndCopy} />
            )}
          </PopUp>
        )}
      </>
    );
  }
}

Welcome.propTypes = {};

export default Welcome;
