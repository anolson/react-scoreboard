import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import './css/app.css'

const PLAYERS = [
  { name: "Andrew Olson", score: 42 },
  { name: "Jim Hoskins", score: 33 }
]

class AddPlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onNameChange(event) {
    this.setState({name: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();

    if(this.state.name) {
      this.props.onAddPlayer(this.state.name);
      this.setState({name: ""});
    }
  }

  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={(event) => this.onSubmit(event)}>
          <input type="text" value={this.state.name} onChange={(event) => this.onNameChange(event)} placeholder="name" />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
}

AddPlayerForm.propTypes = {
  onAddPlayer: PropTypes.func.isRequired
};

class Stopwatch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      running: false,
      elapsedTime: 0,
      startTime: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.onTick(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStart() {
    this.setState({
      running: true,
      startTime: Date.now()
    });
  }

  onStop() {
    this.setState({ running: false });
  }

  onReset() {
    this.setState({
      elapsedTime: 0,
      startTime: Date.now()
    });
  }

  onTick() {
    if(this.state.running) {
      var now = Date.now();
      this.setState({
        elapsedTime: now - this.state.startTime
      });
    }
  }

  render() {
    var stopButton = <button onClick={() => this.onStop()}>Stop</button>
    var startButton = <button onClick={() => this.onStart()}>Start</button>
    var seconds = Math.floor(this.state.elapsedTime / 1000);

    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        {this.state.running ?  stopButton : startButton }
        <button onClick={() => this.onReset()}>Reset</button>
      </div>
    );
  }
}

function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player) { return total + player.score; }, 0)

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Points</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  players: PropTypes.array.isRequired
};

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
};

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}


function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={ function() { props.onChange(-1); } }> - </button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment" onClick={ function() { props.onChange(+1); } }> + </button>
    </div>
  );
}

Counter.propTypes = {
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

class PlayerList extends React.Component {
  render() {
    var emptyState = <p className="no-players">There aren't any players. Get started by adding one.</p>;
    var totalPlayers = this.props.players.length;

    return (
      <div className="players">
        { totalPlayers > 0 ? this.renderPlayers() : emptyState }
      </div>
    );
  }

  renderPlayers() {
    return (
      this.props.players.map(function(player, index) {
        return this.renderPlayer(player, index);
      }.bind(this))
    );
  }

  renderPlayer(player, index) {
    return (
      <Player
        onScoreChange={ function(delta) { this.props.onScoreChange(index, delta) }.bind(this) }
        onRemove={ function() { this.props.onRemovePlayer(index) }.bind(this) }
        name={player.name}
        score={player.score}
        key={index} />
    );
  }
}

PlayerList.propTypes = {
  onScoreChange: PropTypes.func.isRequired,
  onRemovePlayer: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired
};

class Application extends React.Component {
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

Application.propTypes = {
  title: PropTypes.string,
  initialPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired
    })
  ).isRequired
};

Application.defaultProps = {
  title: "Scoreboard"
};


ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'))
