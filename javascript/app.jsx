const PLAYERS = [
  { name: "Andrew Olson", score: 42 },
  { name: "Jim Hoskins", score: 33 }
]

var AddPlayerForm = React.createClass({
  propTypes: {
    onAddPlayer: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      name: ""
    };
  },

  onNameChange: function(event) {
    this.setState({name: event.target.value});
  },

  onSubmit: function(event) {
    event.preventDefault();

    if(this.state.name) {
      this.props.onAddPlayer(this.state.name);
      this.setState({name: ""});
    }
  },

  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange} placeholder="name" />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
});

var Stopwatch = React.createClass({
  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      startTime: 0
    };
  },

  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 100);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  onStart: function() {
    this.setState({
      running: true,
      startTime: Date.now()
    });
  },

  onStop: function() {
    this.setState({ running: false });
  },

  onReset: function() {
    this.setState({
      elapsedTime: 0
    });
  },

  onTick: function() {
    if(this.state.running) {
      var now = Date.now();
      this.setState({
        elapsedTime: now - this.state.startTime
      });
    }
  },

  render: function() {
    var stopButton = <button onClick={this.onStop}>Stop</button>
    var startButton = <button onClick={this.onStart}>Start</button>
    var seconds = Math.floor(this.state.elapsedTime / 1000);

    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        {this.state.running ?  stopButton : startButton }
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
});

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
  players: React.PropTypes.array.isRequired
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
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
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
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
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
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}

var PlayerList = React.createClass({

  propTypes: {
    onScoreChange: React.PropTypes.func.isRequired,
    onRemovePlayer: React.PropTypes.func.isRequired,
    players: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired
      })
    ).isRequired
  },

  render: function () {
    var emptyState = <p className="no-players">There aren't any players. Get started by adding one.</p>;
    var totalPlayers = this.props.players.length;

    return (
      <div className="players">
        { totalPlayers > 0 ? this.renderPlayers() : emptyState }
      </div>
    );
  },

  renderPlayers: function() {
    return (
      this.props.players.map(function(player, index) {
        return this.renderPlayer(player, index);
      }.bind(this))
    );
  },

  renderPlayer: function(player, index) {
    return (
      <Player
        onScoreChange={ function(delta) { this.props.onScoreChange(index, delta) }.bind(this) }
        onRemove={ function() { this.props.onRemovePlayer(index) }.bind(this) }
        name={player.name}
        score={player.score}
        key={index} />
    );
  }
});

var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired
      })
    ).isRequired
  },

  getDefaultProps: function() {
    return {
      title: "Scoreboard"
    };
  },

  getInitialState: function() {
    return {
      players: this.props.initialPlayers
    };
  },

  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta
    this.setState(this.state)
  },

  onAddPlayer: function(name) {
    this.state.players.push({name: name, score: 0})
    this.setState(this.state)
  },

  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state)
  },

  render: function() {
    var players = this.state.players;

    return (
      <div className="scoreboard">
        <Header title={ this.props.title } players={ players } />
        <PlayerList
          players={ players }
          onScoreChange={ this.onScoreChange }
          onRemovePlayer={ this.onRemovePlayer } />
        <AddPlayerForm onAddPlayer={ this.onAddPlayer } />
      </div>
    );
  }
});

ReactDOM.render(<Application initialPlayers={PLAYERS} />, document.getElementById('container'))





