import { connect } from "react-redux";

import { addPlayer } from "app/store";
import AddPlayerForm from "components/AddPlayerForm";

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPlayer: (name) => { dispatch(addPlayer(name)) }
  }
};

export default connect(null, mapDispatchToProps)(AddPlayerForm);
