import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { randomId } from "../util";

const settings = {
  endpoint: "localhost:8000",
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
  const [tx, setTx] = useState(null);

  useEffect(() => {
    console.log(`Welcome, random user ${settings.clientId}`);
    socket.emit(settings.channel.join, { user: settings.clientId });

    socket.on(settings.channel.join, data => {
      console.log(data);
    });
    socket.on(settings.channel.transact, data => {
      setTx(data);
    });
  }, []);
  return <WrappedComponent sendToServer={send} txFromServer={tx} {...props} />;
};

export default withSocket;
