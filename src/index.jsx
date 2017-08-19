import React from 'react';
import ReactDOM from 'react-dom';
import App from "app";

import './index.css'

const PLAYERS = [
  { name: "Andrew Olson", score: 42 },
  { name: "Jim Hoskins", score: 33 }
]

ReactDOM.render(<App initialPlayers={PLAYERS} />, document.getElementById('container'))
