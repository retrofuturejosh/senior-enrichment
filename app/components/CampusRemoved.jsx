import React from 'react';
import Home from './home';
import { Link } from 'react-router-dom';

const CampusRemoved = (props) => {
  return (
    <div>
      <h1>
        REMOVED {props.match.params.name}
      </h1>
      <ul>
        <li><Link to ="/campus">CAMPUSES</Link></li>
        <li><Link to ="/student">STUDENTS</Link></li>
      </ul>
    </div>
  );
}

export default CampusRemoved;