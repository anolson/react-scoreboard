import { connect } from "react-redux";

import AddPlayerForm from "components/AddPlayerForm";

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlayer: (name) => {
      dispatch({type: "ADD_PLAYER", payload: {name: name, score: 0}});
    }
  }
}

export default connect(null, mapDispatchToProps)(AddPlayerForm)
