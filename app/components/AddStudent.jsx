import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
            campusId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campuses => {
            this.setState({campuses})
        })
    }
    
    handleChange (category, e) {
        this.setState({
            [category]: e.target.value
        })
    }

    handleSubmit (e) {
        e.preventDefault();
        let fetchStudents = this.props.fetchStudents;
        let newStudent = {
            name: this.state.firstName + ' ' + this.state.lastName,
            email: this.state.email,
            gpa: this.state.gpa,
            campusId: this.state.campusId
        }
        axios.post("/api/student", newStudent)
        .then(student => {
            console.log('posted! ', student.data);
            fetchStudents();
        })
        .catch(error => console.log(error))
        let clearStudent = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            redirect: false
        }
        this.setState(clearStudent);
    }  

    render(props) {
        return (
            <div>
                <h2>Add Student</h2>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <input type="text" name="firstName" placeholder="First Name" autoComplete="off"
                        onChange={(e) => this.handleChange("firstName", e)}
                        value={this.state.firstName}></input>
                        <br />
                        <input type="text" name="lastName" placeholder="Last Name" autoComplete="off"
                        onChange={(e) => this.handleChange("lastName", e)}
                        value={this.state.lastName}></input>
                        <br />
                        <input type="text" name="email" placeholder="Email"autoComplete="off"
                        onChange={(e) => this.handleChange("email", e)}
                        value={this.state.email}></input>
                        <br />
                        <input type="number" step="0.01" name="GPA" placeholder="GPA" autoComplete="off" onChange={(e) => this.handleChange("gpa", e)}
                        value={this.state.gpa}></input>
                        <br />
                        <select name="campus" onChange={(e) => this.handleChange("campusId", e)}>
                        <option value="" disabled selected>Select Campus</option>
                        {
                            this.state.campuses.map(campus => {
                                return <option value={campus.id} key={campus.id}>{campus.name}</option>
                            })
                        }
                        </select>
                        <input type="submit"></input>
                    </fieldset>
                </form>
            </div>
        )
    }

    
}

