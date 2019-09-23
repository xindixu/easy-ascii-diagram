import React, { Component } from "react";
import PropTypes from "prop-types";
import PopUp from "../../components/pop-up";
import withSocket from "../../hoc/withSocket";
import { randomId, selectAndCopy } from "../../util";
import { Button, Input } from "./styles";

const Collaboration = React.createContext(false);

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

  createRoom = () => {
    const newRoom = randomId("RM");
    this.setState({ newRoom });
    this.props.createRoom(newRoom);

  };

  joinRoom = () => {
    const { inputRoom } = this.state;
    this.props.joinRoom(inputRoom);
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

            <Button type="primary" onClick={this.joinRoom}>
              Join the Room
            </Button>
            <Button type="primary" onClick={this.createRoom}>
              Create a Room
            </Button>
            {newRoom && (
              <Input type="string" value={newRoom} onClick={selectAndCopy} readOnly/>
            )}
          </PopUp>
        )}
      </>
    );
  }
}

Welcome.propTypes = {
  joinRoom: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
};

export default withSocket(Welcome);
