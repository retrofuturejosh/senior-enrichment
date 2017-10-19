import React, { Component } from 'react';
import axios from 'axios'
import { Link, browserHistory } from 'react-router-dom';

export default class StudentTable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            students: []
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount () {
        let fetchPromise = this.props.fetchStudents();
        fetchPromise.then(students => {
            this.setState({students})
        })
    }

    handleDelete (e) {
        e.preventDefault();
        let studentId = e.target.value;
        axios.delete(`/api/student/${studentId}`)
        .then(student => {
            this.props.fetchStudents();
        })
    }

    render () {
        return (
            <table style={{width: "75%"}}>
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
                            <td><button value={student.id} onClick={this.handleDelete}> DELETE STUDENT </button></td>
                            </tr>
                    )} else {
                        return (
                            <tr key={student.id}>
                            <td key={student.id} ><Link to={`/student/${student.id}`}>{ student.name }</Link></td>
                            <td>No Campus Assigned</td>
                            <td>{student.email}</td>
                            <td><Link to={`/student/edit/${student.id}`}><button> EDIT STUDENT </button></Link></td>
                            <td><button value={student.id} onClick={this.handleDelete}> DELETE STUDENT </button></td>
                            </tr>
                    )}
                }
            )}
        </table>
        )
    }
}





