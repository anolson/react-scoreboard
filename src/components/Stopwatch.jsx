import React from 'react';
import PropTypes from 'prop-types';

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

export default Stopwatch;
