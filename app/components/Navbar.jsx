import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Navbar = () => {
    return (
        <div>
            <Link to ="/campus">CAMPUSES</Link>
            <br />
            <Link to ="/student">STUDENTS</Link>
        </div>
    )
}

export default Navbar;