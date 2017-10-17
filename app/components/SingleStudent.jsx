import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SingleStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            student: {},
            campus: {}
        }
    }

    componentDidMount() {
        let studentId = this.props.match.params.id;
        let studentPromise = axios.get(`/api/student/${studentId}`)
        .then(res => res.data)
        .then(student => {
            this.setState({ student })
            return student.campusId;
        })
        .then(campusId => {
            return axios.get(`/api/campus/${campusId}`)
        })
        .then(res => res.data)
        .then(campus => {
            this.setState({campus})
        })
        .catch(error => console.log('BUMMER ', error));

    }

    render(props) {
        console.log('State is ', this.state)
            return (
            <div>
                <h1>{this.state.student.name}</h1>
                <ul>
                    <li>Campus: <Link to={`/campus/${this.state.campus.id}`}>{this.state.campus.name} </Link></li>
                    <li>Email: {this.state.student.email}</li>
                    <li>GPA: {this.state.student.gpa} </li>
                </ul>
            </div>
        )
    }
}