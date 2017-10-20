import React, { Component } from 'react';
import axios from 'axios'
import { Link, browserHistory } from 'react-router-dom';
import AddStudent from './AddStudent'

export default class Campus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            filteredStudents: [],
            searchfield: '',
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
        this.organizeStudents = this.organizeStudents.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let fetchPromise = this.fetchStudents();
        fetchPromise.then(students => {
            this.setState({ students, filteredStudents: students })
        })
    }

    handleDelete(e) {
        e.preventDefault();
        let studentId = e.target.value;
        axios.delete(`/api/student/${studentId}`)
            .then(student => {
                this.fetchStudents();
            })
        this.setState({searchfield: ''})
    }

    fetchStudents() {
        return axios.get('/api/student')
            .then(res => res.data)
            .then(students => {
                this.organizeStudents(students);
                this.setState({ students, filteredStudents: students })
                return students;
            })
    }

    organizeStudents(students) {
        return students.sort((a, b) => {
            let lastNameA = a.name.split(' ')[1].toUpperCase();
            let lastNameB = b.name.split(' ')[1].toUpperCase();
            return (lastNameA > lastNameB) ? 1 : ((lastNameB > lastNameA) ? -1 : 0);
        });
    }

    handleChange (e) {
        let filteredStudents
        this.setState({searchfield: e.target.value}, () => {
            filteredStudents = this.state.students.filter(student => {
                if (student.campus){
                    if (student.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) ||
                    student.campus.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) ||
                    student.email.toLowerCase().includes(this.state.searchfield.toLowerCase())){
                        return student
                    }
                } else {
                    if (student.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) ||
                    student.email.toLowerCase().includes(this.state.searchfield.toLowerCase())){
                        return student
                    }
                }
            })
            this.setState({filteredStudents});
        })
    }

    render(props) {

        return (
            <div id="current-component">
                <div id="add-student-feature">
                    <div id="add-student-field">
                        <AddStudent fetchStudents={this.fetchStudents} />
                    </div>
                    <br />
                    <div id="student-header">
                        <h1>Students</h1>
                    </div>
                    <div id="search-component">
                        <form id="search-form">
                            <input id="search-form-input" type="test" value={this.state.searchfield} onChange={this.handleChange} placeholder="Search Students" />
                        </form>
                    </div>
                    <br />

                    <div id="student-table">
                        <table style={{ width: "95%" }}>
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Campus</th>
                                    <th>Email</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.filteredStudents.map(student => {
                                    if (student.campus) {
                                        return (
                                            <tr key={student.id}>
                                                <td key={student.id} ><Link to={`/student/${student.id}`}>{student.name}</Link></td>
                                                <td><Link to={`/campus/${student.campusId}`}>{student.campus.name} </Link></td>
                                                <td><a href={`mailto:${student.email}`}>{student.email}</a></td>
                                                <td><Link to={`/student/edit/${student.id}`}><button>EDIT</button></Link></td>
                                                <td><button id="delete-student-button" value={student.id} onClick={this.handleDelete}>DELETE</button></td>
                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr key={student.id}>
                                                <td key={student.id} ><Link to={`/student/${student.id}`}>{student.name}</Link></td>
                                                <td>No Campus Assigned</td>
                                                <td><a href={`mailto:${student.email}`}>{student.email}</a></td>
                                                <td><Link to={`/student/edit/${student.id}`}><button>EDIT</button></Link></td>
                                                <td><button id="delete-student-button" value={student.id} onClick={this.handleDelete}>DELETE</button></td>
                                            </tr>
                                        )
                                    }
                                }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}