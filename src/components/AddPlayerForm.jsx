import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AddPlayerForm(props) {
  const [name, setName] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(name) {
      props.onAddPlayer(name);
      setName("");
    }
  };

  return (
    <div className="add-player-form">
      <form onSubmit={(event) => onSubmit(event)}>
        <input type="text" value={name} onChange={(event) => onNameChange(event)} placeholder="name" />
        <input type="submit" value="Add Player" />
      </form>
    </div>
  );
}

AddPlayerForm.propTypes = {
  onAddPlayer: PropTypes.func.isRequired
};

export default AddPlayerForm;
