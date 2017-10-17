import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default class Campus extends Component {
    constructor (props) {
        super(props)
    }

    render (props) { 
        return (
            <div>
                <h1>Students</h1>
                <ul>
                    {
                        this.props.students.map(student => {
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