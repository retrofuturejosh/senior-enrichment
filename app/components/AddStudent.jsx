import React, { Component } from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router-dom';
import { Redirect } from 'react-router'

export default class AddStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campuses: [],
            students: [],
            campus: {},
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            campusId: '',
            errors: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/campus')
            .then(res => res.data)
            .then(campuses => {
                this.setState({ campuses })
            })
    }

    handleChange(category, e) {
        this.setState({
            [category]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let fetchStudents = this.props.fetchStudents;
        let fetchPromise, campusId, gpa;
        if (this.state.gpa === '') gpa = 0.0;
        else gpa = this.state.gpa;
        if (this.state.campusId === '') campusId = null;
        else campusId = this.state.campusId;
        let newStudent = {
            name: this.state.firstName + ' ' + this.state.lastName,
            email: this.state.email,
            gpa,
            campusId
        }
        console.log(newStudent)
        let clearStudent = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            redirect: false
        }
        axios.post("/api/student", newStudent)
            .then(student => {
                console.log('posted! ', student.data);
                if (student.data.errors) {
                    this.setState({errors: true})
                } else {
                    this.setState({errors: false})
                }
                return fetchStudents();
            })
            .then(() => {
                this.setState(clearStudent)
            })
            .catch(error => console.log(error))
    }

    render(props) {
        return (
            <div id="add-student-component">
                <h2>Add Student</h2>
                <form onSubmit={this.handleSubmit}>
                    <div id="add-field-box">
                        <fieldset id="add-field-box">
                            <input id="expand-input" type="text" name="firstName" placeholder="First Name" autoComplete="off"
                                onChange={(e) => this.handleChange("firstName", e)}
                                value={this.state.firstName}></input>
                            <br />
                            <br />
                            <input id="expand-input" type="text" name="lastName" placeholder="Last Name" autoComplete="off"
                                onChange={(e) => this.handleChange("lastName", e)}
                                value={this.state.lastName}></input>
                            <br />
                            <br />
                            <input id="expand-input" type="text" name="email" placeholder="Email" autoComplete="off"
                                onChange={(e) => this.handleChange("email", e)}
                                value={this.state.email}></input>
                            <br />
                            <br />
                            <input id="expand-input" type="number" step="0.01" name="GPA" placeholder="GPA" autoComplete="off" onChange={(e) => this.handleChange("gpa", e)}
                                value={this.state.gpa}></input>
                            <br />
                            <br />
                            <select id="expand-input" name="campus" onChange={(e) => this.handleChange("campusId", e)}>
                                <option value="" disabled selected>Select Campus</option>
                                {
                                    this.state.campuses.map(campus => {
                                        return <option value={campus.id} key={campus.id}>{campus.name}</option>
                                    })
                                }
                            </select>
                            <br />
                            <br />
                            <input id="expand-input" className="button" type="submit"></input>
                            <br />
                            <br />
                        </fieldset>
                    </div>
                    {
                        (this.state.errors) ? (
                            <div>
                                Valid email is required to add student.
                            </div>
                        ) : null
                    }
                </form>
            </div>
        )
    }


}

