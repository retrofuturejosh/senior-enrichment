import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router-dom';
import axios from 'axios'

export default class MyDropDown extends Component {
    constructor() {
        super()
        this.state = {
            campuses: []
        }
    }

    componentDidMount() {
        axios.get('/api/campus')
            .then(res => res.data)
            .then(campuses => {
                this.setState({ campuses })
            })
    }

    render() {
        return (
            <div className="dropdown">
                <div id="dropdown-burger">
                    <div id="hamburger"></div>
                    <div id="hamburger"></div>
                    <div id="hamburger"></div>
                </div>
                <div id="dropdown-inside" className="dropdown-content">
                    <ul>
                        <li className="drop-list"><Link to="/home"><h5>Campuses</h5></Link></li>
                        <li className="drop-list"><Link to="/student"><h5>Students</h5></Link></li>
                        <li className="drop-list"><Link to="/campus"><h5>Add Campus</h5></Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}