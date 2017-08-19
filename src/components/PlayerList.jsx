import React from 'react';
import PropTypes from 'prop-types';

import Player from 'components/Player';

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

export default PlayerList;
