import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class SingleCampus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            campus: {}
        }
    }

    componentDidMount() {
        let campusId = this.props.match.params.id;
        let studentPromise = axios.get(`/api/student/campus/${campusId}`)
        .then(res => res.data)
        .then(students => {
            this.setState({ students })
        })
        .catch(error => console.log('BUMMER ', error));

        let campusPromise = axios.get(`/api/campus/${campusId}`)
        .then(res => res.data)
        .then(campus => {
            this.setState({ campus })
        })

    }

    render(props) {
            return (
            <div>
                <h1>{this.state.campus.name}</h1>
                <ul> STUDENTS
                    {
                        this.state.students.map(student => {
                            return (
                                <Link to={`/student/${student.id}`} key={student.id}><li key={student.id}>{student.name}</li></Link>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}