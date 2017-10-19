import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router-dom';
import DropDown from './DropDown';

const Navbar = () => {
    return (
        <div id="navbar">
            <div id="navbar-li-left">
                <Link to ="/" id="colorchange">HOME</Link>
            </div>
            <div id="navbar-li-left">
                <Link to ="/student" id="colorchange">STUDENTS</Link>
            </div>
            <DropDown />
        </div>
    )
}

export default Navbar;