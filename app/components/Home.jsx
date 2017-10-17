import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Home = (props) => {
    return (
        <div>
            <h1>HOME</h1>
            <ul>
                <li><Link to ="/campus">CAMPUSES</Link></li>
                <li><Link to ="/student">STUDENTS</Link></li>
            </ul>
        </div>
    )
}

export default Home;