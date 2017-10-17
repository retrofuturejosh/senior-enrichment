import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default class Campus extends Component {
    constructor (props) {
        super(props)
        this.state = {
            students: []
        }
    }

    componentDidMount () {
        axios.get('/api/student')
        .then(res => res.data)
        .then(students => {
            this.setState({ students })
        })
      }

    render (props) { 
        return (
            <div>
                <h1>Students</h1>
                <ul>
                    {
                        this.state.students.map(student => {
                            return (
                                <li key={student.id} ><Link to={`/student/${student.id}`}>{ student.name }</Link></li>
                            )
                        }
                    )}
                </ul>
            </div>
        )
    }
}