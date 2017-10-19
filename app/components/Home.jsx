import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router-dom';
import axios from 'axios'

export default class Home extends Component {

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
            <div id="current-component">
                <div>
                    <div id="campus-top">
                        <h3 id="campus-float">Campuses</h3>
                        <Link to="/campus"><button id="float-right">Add Campus</button></Link>
                    </div>
                    <br />
                    <table id="campus-table" style={{ "width": "75%" }}>
                        <tr>
                            <th>Campus</th>
                            <th>Edit Campus Info</th>
                            <th>Add/Remove Students</th>
                        </tr>
                        {
                            this.state.campuses.map(campus => {
                                return (
                                    <tr id={campus.id}>
                                        <td key={campus.id} ><Link to={`/campus/${campus.id}`}>{campus.name}</Link></td>
                                        <td><Link to={`/campus/edit/${campus.id}`}><button >Edit Campus</button></Link></td>
                                        <td><Link to={`/campus/${campus.id}`}><button >Add/Remove</button></Link></td>
                                    </tr>
                                )
                            }
                            )}
                    </table>
                </div>
                <br />
                <br />
            </div>
        )
    }
}