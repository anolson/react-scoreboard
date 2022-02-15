import React from 'react';
import PropTypes from 'prop-types';

import Player from 'components/Player';

function PlayerList(props) {
  const renderPlayers = () => {
    return (
      props.players.map((player, index) => {
        return renderPlayer(player, index)
      })
    );
  }

  const renderPlayer = (player, index) => {
    return (
      <Player
        onScoreChange={ (delta) => { this.props.onScoreChange(index, delta) } }
        onRemove={ () => { this.props.onRemovePlayer(index) } }
        name={player.name}
        score={player.score}
        key={index} />
    );
  }

  const renderEmptyState = () => {
    return (
      <p className="no-players">There aren't any players. Get started by adding one.</p>
    )
  }

  return (
    <div className="players">
      { props.players.length > 0 ? renderPlayers() : renderEmptyState() }
    </div>
  );
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
