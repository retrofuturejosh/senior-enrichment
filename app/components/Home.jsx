import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class Home extends Component {

    constructor() {
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

    render() {
        return (
            <div>
                <h1>HOME</h1>
                <div>
                <h2>Campuses</h2>
                    <ul>
                        {
                            this.state.campuses.map(campus => {
                                return (
                                    <li key={campus.id} ><Link to={`/campus/${campus.id}`}>{ campus.name }</Link></li>
                                )
                            }
                        )}
                    </ul>
                </div>
                <div>
                    <Link to="/campus"><button>Add Campus</button></Link>
                </div>
            </div>
        )
    }
}