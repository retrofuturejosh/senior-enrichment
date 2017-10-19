import React, { Component } from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router-dom';
import { Redirect } from 'react-router';

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
            gpa: '',
            error: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.removeFromCampus = this.removeFromCampus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.organizeStudents = this.organizeStudents.bind(this);
    }

    fetchStudents(campusId) {
        axios.get(`/api/student/campus/${campusId}`)
            .then(res => res.data)
            .then(students => {
                students = this.organizeStudents(students);
                this.setState({ students })
            })
            .catch(error => console.log('BUMMER ', error));
    }

    organizeStudents(students) {
        return students.sort((a, b) => {
            let lastNameA = a.name.split(' ')[1];
            let lastNameB = b.name.split(' ')[1];
            return (lastNameA > lastNameB) ? 1 : ((lastNameB > lastNameA) ? -1 : 0);
        });
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
                console.log('Oops! Someone goofed!')
            })

    }

    handleSubmit(e) {
        e.preventDefault();
        let campusId = this.state.campus.id;
        let gpa;
        if (this.state.gpa === '') gpa = 0.0;
        else gpa = this.state.gpa;
        let newStudent = {
            name: this.state.firstName + ' ' + this.state.lastName,
            email: this.state.email,
            gpa,
            campusId
        }
        let newStudentPromise = axios.post("/api/student", newStudent)
            .then(student => {
                console.log('posted! ', student.data);
                if (student.data.errors){
                    this.setState({error: student.data.errors[0].message})
                }
                else this.setState({error: false})
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

    handleChange(category, e) {
        this.setState({
            [category]: e.target.value
        })
    }

    removeFromCampus(e) {
        let studentId = e.target.value;
        let studentEdit = { campusId: null }
        axios.put(`/api/student/${e.target.value}`, studentEdit)
            .then(student => {
                console.log('success ', student)
                this.fetchStudents(this.state.campus.id);
            })
    }

    handleDelete(e) {
        e.preventDefault();
        let campusId = this.state.campus.id;
        savedCampusName = this.state.campus.name;
        axios.delete(`/api/campus/${campusId}`)
            .then(success => {
                this.setState({ redirect: true })
            })
            .catch(error => {
                console.log(error);
            })
    }


    render(props) {
        if (this.state.redirect) {
            return <Redirect to={`/campusremoved/${savedCampusName}`} />;
        }

        if (this.state.campus.id === undefined) {
            return (<div id="current-component">
                        <div id="singlecampus-top">
                            <h1>No Campus Found</h1>
                        </div>
                    </div>
                )
        }

        return (
            <div id="current-component">
                <div id="singlecampus-top">
                    <h1 id="campus-header">{this.state.campus.name}</h1>
                    <button id="campus-button-delete" className="float-right" onClick={this.handleDelete}> DELETE CAMPUS </button>
                    <Link to={`/campus/edit/${this.state.campus.id}`}><button id="campus-button" className="float-right"> EDIT CAMPUS </button> </Link>
                </div>


                <div id="singlecampus-body">
                    <img id="campus-image" src={this.state.campus.image} />
                    <div id="student-list">
                        <div id="campus-student-list">
                            {
                                (this.state.error) ? (
                                    <div>
                                        Unable to add student. Valid email is required.
                                    </div>
                                ) : null
                            }

                            {
                                (this.state.students.length) ? (
                                    <div>
                                        <div id="student-list-header">
                                            <h3>Enrolled Students</h3>
                                        </div>
                                        <table id="single-campus-student-list">
                                            <tbody>
                                            {
                                                this.state.students.map((student, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td className="student-list-td" key={student.id}>
                                                                <Link to={`/student/${student.id}`} key={student.id}>
                                                                    {student.name}
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <button id="student-list-button" onClick={this.removeFromCampus} value={student.id} key={student.id + 'a'}>
                                                                    Remove from Campus
                                                </button>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                        <h4>No Students Enrolled</h4>
                                    )
                            }

                        </div>
                    </div>

                </div>


                <br />

                <div id="campus-add-student">
                    <h3>Add Student</h3>
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <input id="expand-input-half" type="text" name="firstName" placeholder="First Name" autoComplete="off"
                                onChange={(e) => this.handleChange("firstName", e)}
                                value={this.state.firstName}></input>
                            <br />
                            <br />
                            <input id="expand-input-half" type="text" name="lastName" placeholder="Last Name" autoComplete="off"
                                onChange={(e) => this.handleChange("lastName", e)}
                                value={this.state.lastName}></input>
                            <br />
                            <br />
                            <input id="expand-input-half" type="text" name="email" placeholder="Email" autoComplete="off"
                                onChange={(e) => this.handleChange("email", e)}
                                value={this.state.email}></input>
                            <br />
                            <br />
                            <input id="expand-input-half" type="number" step="0.01" name="GPA" placeholder="GPA" autoComplete="off" onChange={(e) => this.handleChange("gpa", e)}
                                value={this.state.gpa}></input>
                            <br />
                            <br />
                            <input id="expand-input-half" className="button" type="submit"></input>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}