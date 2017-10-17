import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

let savedCampusName;

export default class SingleCampus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            campus: {},
            firstName: '',
            lastName: '',
            email: '',
            gpa: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.removeFromCampus = this.removeFromCampus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    fetchStudents (campusId) {
        axios.get(`/api/student/campus/${campusId}`)
        .then(res => res.data)
        .then(students => {
            this.setState({ students })
        })
        .catch(error => console.log('BUMMER ', error));
    }

    componentDidMount() {
        let campusId = this.props.match.params.id;
        axios.get(`/api/campus/${campusId}`)
        .then(res => res.data)
        .then(campus => {
            this.setState({ campus })
        })
        .then(() => {
            this.fetchStudents(campusId);
        })
        .catch(error => {
            console.log("heeeeeeeey")
        })

    }

    handleSubmit (e) {
        e.preventDefault();
        let campusId = this.state.campus.id;
        let newStudent = {
            name: this.state.firstName + ' ' + this.state.lastName,
            email: this.state.email,
            gpa: this.state.gpa,
            campusId: campusId
        }
        let newStudentPromise = axios.post("/api/student", newStudent)
        .then(student => {
            console.log('posted! ', student.data);
        })
        .then(() => {
            this.fetchStudents(campusId);
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

    handleChange (category, e) {
        this.setState({
            [category]: e.target.value
        })
    }
        
    removeFromCampus (e){
        let studentId = e.target.value;
        let studentEdit = {campusId: null}
        axios.put(`/api/student/${e.target.value}`, studentEdit)
        .then(student => {
            console.log('success ', student)
            this.fetchStudents(this.state.campus.id);
        })
    }

    handleDelete (e) {
        e.preventDefault();
        let campusId = this.state.campus.id;
        savedCampusName = this.state.campus.name;
        axios.delete(`/api/campus/${campusId}`)
        .then(success =>{
            console.log('success ', success)
            this.setState({redirect: true})
        })
    }
    

    render(props) {
        if(this.state.redirect){
            return <Redirect to={`/campusremoved/${savedCampusName}`}/>;
        } 

        if(this.state.campus.id === undefined){
            return <h1>No Campus Found</h1>
        }
        
        return (
            <div>
                <div>
                    <h1>{this.state.campus.name}</h1>
                    <div style={{"width": "50%"}}>
                        <h3>STUDENTS</h3>
                        <div>
                        <ul> 
                            {
                            this.state.students.map((student, idx) => {
                                return (
                                    <div key={student.id + 'd'}>
                                    <li key={student.id}>
                                        <Link to={`/student/${student.id}`} key={student.id}>
                                            {student.name}
                                        </Link> 
                                        <button onClick={this.removeFromCampus} value={student.id} key={student.id + 'a'} style={{float: "right"}}>
                                        Remove from Campus
                                        </button>
                                        
                                    </li>
                                    <br />
                                    </div>
                                )})
                            }
                        </ul>
                        </div>
                    </div>
                </div>

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
                            <input type="submit"></input>
                        </fieldset>
                    </form>
                </div>
                <br />
                <br />
                <div>
                    <button onClick={this.handleDelete}> DELETE CAMPUS </button>
                </div>
            </div>
            )
    }
}