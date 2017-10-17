import React from 'react';
import Home from './Home';
import { Link } from 'react-router-dom';

const CampusRemoved = (props) => {
  return (
    <div>
      <h1>
        REMOVED {props.match.params.name} CAMPUS
      </h1>
    </div>
  );
}

export default CampusRemoved;