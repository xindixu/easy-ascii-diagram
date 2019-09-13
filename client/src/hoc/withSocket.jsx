import React, { useEffect } from "react";
import PropTypes from "prop-types";
import socketIOClient from "socket.io-client";
import { randomId } from "../util";

const settings = {
  endpoint: "localhost:5000",
  clientId: randomId("USER"),
  channel: "transaction"
};

const socket = socketIOClient(settings.endpoint);
const send = tx => {
  socket.emit("transaction", tx); // change 'red' to this.state.color
};

const withSocket = WrappedComponent => props => {
  useEffect(() => {
    socket.on(settings.channel, tx => {
      console.log(tx);
    });
  }, []);
  return <WrappedComponent sendToServer={send} {...props} />;
};

withSocket.propTypes = {};

export default withSocket;
