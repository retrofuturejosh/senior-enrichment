import React from 'react';
import Home from './Home';
import { Link } from 'react-router-dom';

const StudentRemoved = (props) => {
  return (
    <div>
      <h1>
        REMOVED {props.match.params.name}
      </h1>
    </div>
  );
}

export default StudentRemoved;