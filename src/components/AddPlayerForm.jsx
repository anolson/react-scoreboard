import React from "react";
import PropTypes from 'prop-types';

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

export default AddPlayerForm;
