import React from "react";
// import Pusher from 'pusher-js';
import { Provider } from "react-redux";
import SketchPad from "./containers/sketch-pad";
import store from "./store";



function App() {
  // Pusher.logToConsole = true;

  // const pusher = new Pusher('c007ac7359c638bacebe', {
  //   cluster: 'us2',
  //   forceTLS: true,
  // });

  // const channel = pusher.subscribe('my-channel');
  // channel.bind('my-event', (data) => {
  //   alert(JSON.stringify(data));
  // });
  return (
    <Provider store={store}>
      <div className="App">
        <SketchPad />
      </div>
    </Provider>
  );
}

export default App;
