import React, { Component } from "react";
import PropTypes from "prop-types";
import PopUp from "../../components/pop-up";
import withSocket from "../../hoc/withSocket";
import { randomId, selectAndCopy } from "../../util";
import { Input } from "./styles";
import Button from "../../components/button";

class Welcome extends Component {
  state = {
    popUpClosed: false,
    inputRoom: "",
    newRoom: "",
  };

  componentDidMount() {}

  closePopUp = () => {
    this.setState({ popUpClosed: true });
    this.props.setCollaboration(false);
  };

  createRoom = () => {
    const newRoom = randomId("RM");
    const { createRoom, setCollaboration } = this.props;
    createRoom(newRoom);
    setCollaboration(true);
    this.setState({ newRoom });
  };

  joinRoom = () => {
    const { inputRoom } = this.state;
    const { joinRoom, setCollaboration } = this.props;
    joinRoom(inputRoom);
    setCollaboration(true);
    this.setState({ popUpClosed: true });
  };

  handleInputChange = (e) => {
    this.setState({ inputRoom: e.target.value });
  };

  render() {
    const { popUpClosed, inputRoom, newRoom } = this.state;
    const { setCollaboration } = this.props;
    return (
      <>
        {popUpClosed || (
          <PopUp
            closePopUp={this.closePopUp}
            header="Enter room code to start collaborating!"
          >
            {newRoom ? (
              <>
                <p>Ask your friend to enter this code!</p>
                <Input
                  type="string"
                  value={newRoom}
                  onClick={selectAndCopy}
                  readOnly
                />
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ popUpClosed: true });
                    setCollaboration(true);
                  }}
                >
                  Ready!
                </Button>
              </>
            ) : (
              <>
                <Input
                  type="string"
                  value={inputRoom}
                  onChange={(e) => this.handleInputChange(e)}
                />
                <Button
                  type="primary"
                  onClick={this.joinRoom}
                  disabled={inputRoom === ""}
                >
                  Join the Room
                </Button>
                <Button type="primary" onClick={this.createRoom}>
                  Create a Room
                </Button>
              </>
            )}

            <Button
              type="primary"
              onClick={() => {
                this.setState({ popUpClosed: true });
                setCollaboration(false);
              }}
            >
              No Collaboration
            </Button>
          </PopUp>
        )}
      </>
    );
  }
}
Welcome.propTypes = {
  joinRoom: PropTypes.func.isRequired,
  createRoom: PropTypes.func.isRequired,
  setCollaboration: PropTypes.func.isRequired,
};

export default withSocket(Welcome);
