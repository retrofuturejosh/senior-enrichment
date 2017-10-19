import React, { Component } from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router-dom';
import { Redirect } from 'react-router'

let savedName = null;

export default class SingleStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            student: {},
            campus: {},
            redirect: false
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let studentId = this.props.match.params.id;
        let studentPromise = axios.get(`/api/student/${studentId}`)
            .then(res => res.data)
            .then(student => {
                this.setState({ student, campus: student.campus })
                savedName = student.name;
            })
            .catch(error => console.log('BUMMER ', error));

    }

    handleDelete(e) {
        e.preventDefault();
        let studentId = this.state.student.id;
        let savedId = this.state.campus.id
        axios.delete(`/api/student/${studentId}`)
            .then(student => {
                this.setState({ redirect: true })
            })
    }

    render(props) {

        if (this.state.redirect) {
            if (savedName === null) {
                return <Redirect to={`/`} />;
            } else return <Redirect to={`/studentremoved/${savedName}`} />;
        }
        if (!this.state.student.id) {
            return <div> <h1>NO STUDENT FOUND</h1></div>
        }

        return (
            <div id="current-component">
                <div id="single-student">
                    <div id="single-student-header">
                        <h1>{this.state.student.name}</h1>
                    </div>
                    <button id="expand-input-half" className="delete-student-button" onClick={this.handleDelete}> DELETE STUDENT </button>
                    <br />
                    <div id="single-student-info">
                        <ul>
                            <li>Campus: <Link to={`/campus/${this.state.campus.id}`}>{this.state.campus.name} </Link></li>
                            <li>Email: <a href={`mailto:${this.state.student.email}`}> {this.state.student.email} </a></li>
                            <li>GPA: {this.state.student.gpa} </li>
                        </ul>
                    </div>
                    <br />

                    <div>
                        <Link to={`/student/edit/${this.state.student.id}`}><button id="expand-input-half"> EDIT STUDENT </button></Link>
                    </div>
                </div>
            </div>
        )
    }
}