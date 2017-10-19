import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router-dom';
import axios from 'axios'

export default class MyDropDown extends Component {
    constructor () {
        super()
        this.state = {
            campuses: []
        }
    }

    componentDidMount () {
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campuses => {
            this.setState({ campuses })
        })
    }

    render () {
        return (
                <div className="dropdown">
                    <div id="dropdown-burger">
                        <div id="hamburger"></div>
                        <div id="hamburger"></div>
                        <div id="hamburger"></div>
                    </div>
                <div id="dropdown-inside" className="dropdown-content">
                    <ul>
                    {
                        this.state.campuses.map(campus => {
                            return <li className="drop-list" key={campus.id}><Link to={`/campus/${campus.id}`}>{campus.name}</Link></li>
                        })
                    }
                    </ul>
                </div>
            </div>
            )
        }
}