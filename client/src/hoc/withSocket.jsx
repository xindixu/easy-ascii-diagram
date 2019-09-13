import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { randomId } from "../util";

const settings = {
  endpoint: "localhost:5000",
  clientId: randomId("USER"),
  channel: {
    transact: "transact",
    join: "join"
  }
};

const socket = socketIOClient(settings.endpoint);
const send = tx => {
  socket.emit(settings.channel.transact, {
    user: settings.clientId,
    transaction: tx
  });
};

const withSocket = WrappedComponent => props => {
  useEffect(() => {
    socket.emit(settings.channel.join, { user: settings.clientId });

    socket.on(settings.channel.transact, data => {
      console.log(data);
    });
  }, []);
  return <WrappedComponent sendToServer={send} {...props} />;
};

export default withSocket;
