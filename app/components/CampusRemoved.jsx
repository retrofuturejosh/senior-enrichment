import React from 'react';
import Home from './Home';
import { Link, browserHistory } from 'react-router-dom';

const CampusRemoved = (props) => {
  return (
    <div id="current-component">
      <div id="component-removed">
        <h1>
          REMOVED {props.match.params.name} CAMPUS
          </h1>
      </div>
    </div>
  );
}

export default CampusRemoved;