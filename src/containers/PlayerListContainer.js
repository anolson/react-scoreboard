import { connect } from "react-redux";

import PlayerList from "components/PlayerList";

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovePlayer: (index) => {
      dispatch({type: "REMOVE_PLAYER", payload: index});
    },
    onScoreChange: (index, delta) => {
      dispatch({type: "SCORE_CHANGED", payload: {index: index, delta: delta}});
    }
  }
}

export default connect(null, mapDispatchToProps)(PlayerList)
