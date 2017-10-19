import React, { Component } from 'react';
import axios from 'axios'
import { Link, browserHistory } from 'react-router-dom';
import AddStudent from './AddStudent'
import StudentTable from './StudentTable'

export default class Campus extends Component {
    constructor (props) {
        super(props)
        this.state = {
            students: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.organizeStudents = this.organizeStudents.bind(this);
    }

    componentDidMount () {
        let fetchPromise = this.fetchStudents();
        fetchPromise.then(students => {
            this.setState({students})
        })
    }

    handleDelete (e) {
        e.preventDefault();
        let studentId = e.target.value;
        axios.delete(`/api/student/${studentId}`)
        .then(student => {
            this.fetchStudents();
        })
    }
    
    fetchStudents () {
        return axios.get('/api/student')
        .then(res => res.data)
        .then(students => {
            this.organizeStudents(students);
            this.setState({ students })
            return students;
        })
    }

    organizeStudents (students) {
        return students.sort((a,b) => {
            let lastNameA = a.name.split(' ')[1];
            let lastNameB = b.name.split(' ')[1];
            return (lastNameA > lastNameB) ? 1 : ((lastNameB > lastNameA) ? -1 : 0);
        });
    }

    render (props) { 

        return (
            <div id="current-component">
                <div id="add-student-feature">
                    <div id="add-student-field">
                        <AddStudent fetchStudents={this.fetchStudents}/>
                    </div>
                <br />

                    <div id="student-table">
                    <div>
                        <h1>Students</h1>
                    </div>
                        <table style={{width: "95%"}}>
                            <tr>
                                <th>Student</th>
                                <th>Campus</th>
                                <th>Email</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            {
                                this.state.students.map(student => {
                                    if (student.campus) {
                                        return (
                                            <tr key={student.id}>
                                            <td key={student.id} ><Link to={`/student/${student.id}`}>{ student.name }</Link></td>
                                            <td><Link to={`/campus/${student.campusId}`}>{student.campus.name} </Link></td>
                                            <td><a href={`mailto:${student.email}`}>{student.email}</a></td>
                                            <td><Link to={`/student/edit/${student.id}`}><button> EDIT STUDENT </button></Link></td>
                                            <td><button id="delete-student-button" value={student.id} onClick={this.handleDelete}> DELETE STUDENT </button></td>
                                            </tr>
                                    )} else {
                                        return (
                                            <tr key={student.id}>
                                            <td key={student.id} ><Link to={`/student/${student.id}`}>{ student.name }</Link></td>
                                            <td>No Campus Assigned</td>
                                            <td><a href={`mailto:${student.email}`}>{student.email}</a></td>
                                            <td><Link to={`/student/edit/${student.id}`}><button> EDIT STUDENT </button></Link></td>
                                            <td><button id="delete-student-button" value={student.id} onClick={this.handleDelete}> DELETE STUDENT </button></td>
                                            </tr>
                                    )}
                                }
                            )}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}