import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddPlayerForm from "containers/AddPlayerFormContainer";
import Header from "components/Header";
import PlayerList from "containers/PlayerListContainer";

class App extends React.Component {
  render() {
    return (
      <div className="scoreboard">
        <Header title={ this.props.title } players={ this.props.players } />
        <PlayerList players={ this.props.players } />
        <AddPlayerForm />
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired
};

App.defaultProps = {
  title: "Scoreboard",
  players: [],
};

const mapStateToProps = (state) => {
  return {
    players: state.players
  };
};

export default connect(mapStateToProps, null)(App)

