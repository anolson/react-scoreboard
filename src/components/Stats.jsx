import React from 'react';
import PropTypes from 'prop-types';

function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce((total, player) => { return total + player.score; }, 0)

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

export default Stats;
