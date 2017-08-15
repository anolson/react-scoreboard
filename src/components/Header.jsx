import React from "react";
import PropTypes from 'prop-types';

import Stats from "components/Stats";
import Stopwatch from "components/Stopwatch";

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired
};

export default Header;
