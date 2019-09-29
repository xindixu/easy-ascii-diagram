import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { randomId } from "../util";

const settings = {
  endpoint: "localhost:8000",
  clientId: randomId("USER"),
  room: null,
  channel: {
    transact: "transact",
    logIn: "logIn",
    joinRoom: "joinRoom",
    createRoom: "createRoom"
  }
};

const socket = socketIOClient(settings.endpoint);

const sendTxToServer = tx => {
  socket.emit(settings.channel.transact, {
    user: settings.clientId,
    room: settings.room,
    transaction: tx
  });
};

const createRoom = roomId => {
  settings.room = roomId;
  socket.emit(settings.channel.createRoom, {
    user: settings.clientId,
    room: roomId
  });
};

const joinRoom = roomId => {
  settings.room = roomId;
  const data = {
    user: settings.clientId,
    room: roomId
  };
  socket.emit(settings.channel.joinRoom, data);
};

const withSocket = WrappedComponent => props => {
  const [tx, setTx] = useState(null);

  useEffect(() => {
    console.log(`Welcome, random user ${settings.clientId}`);
    socket.emit(settings.channel.logIn, { user: settings.clientId });
    socket.on(settings.channel.transact, data => {
      setTx(data);
    });
  }, []);
  return (
    <WrappedComponent
      sendTxToServer={sendTxToServer}
      txFromServer={tx}
      joinRoom={joinRoom}
      createRoom={createRoom}
      {...props}
    />
  );
};

export default withSocket;
