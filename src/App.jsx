import React from 'react';
import PropTypes from 'prop-types';

import AddPlayerForm from "components/AddPlayerForm";
import Header from "components/Header";
import PlayerList from "components/PlayerList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: this.props.initialPlayers
    };
  }

  onScoreChange(index, delta) {
    this.state.players[index].score += delta
    this.setState(this.state)
  }

  onAddPlayer(name) {
    this.state.players.push({name: name, score: 0})
    this.setState(this.state)
  }

  onRemovePlayer(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state)
  }

  render() {
    var players = this.state.players;

    return (
      <div className="scoreboard">
        <Header title={ this.props.title } players={ players } />
        <PlayerList
          players={ players }
          onScoreChange={ (index, delta) => this.onScoreChange(index, delta) }
          onRemovePlayer={ (index) => this.onRemovePlayer(index) } />
        <AddPlayerForm onAddPlayer={ (name) => this.onAddPlayer(name) } />
      </div>
    );
  }
}

App.propTypes = {
  title: PropTypes.string,
  initialPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired
};

App.defaultProps = {
  title: "Scoreboard"
};

export default App;
