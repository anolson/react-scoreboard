import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import AddPlayerForm from "containers/AddPlayerFormContainer";
import Header from "components/Header";
import PlayerList from "containers/PlayerListContainer";

function App(props) {
  const players = useSelector((state) => state.players)
  const { title } = props

  return (
    <div className="scoreboard">
      <Header title={ props.title } players={ players } />
      <PlayerList players={ players } />
      <AddPlayerForm />
    </div>
  );
}

App.propTypes = {
  title: PropTypes.string,
};

App.defaultProps = {
  title: "Scoreboard",
};

export default App;

