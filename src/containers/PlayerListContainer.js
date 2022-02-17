import { connect } from "react-redux";

import { removePlayer, updateScore } from "app/store";
import PlayerList from "components/PlayerList";

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovePlayer: (index) => { dispatch(removePlayer(index)) },
    onScoreChange: (index, delta) => { dispatch(updateScore(index, delta)) }
  }
};

export default connect(null, mapDispatchToProps)(PlayerList);
