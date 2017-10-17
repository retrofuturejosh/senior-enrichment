import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import AddStudent from './AddStudent'

export default class Campus extends Component {
    constructor (props) {
        super(props)
        this.state = {
            students: []
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.fetchStudents = this.fetchStudents.bind(this);
    }

    componentDidMount () {
        this.fetchStudents();
    }
    
    fetchStudents () {
        axios.get('/api/student')
        .then(res => res.data)
        .then(students => {
            this.setState({ students })
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

    render (props) { 
        return (
            <div>
                <h1>Students</h1>
                <br />
                <table style={{width: "65%"}}>
                    <tr>
                        <th>Student</th>
                        <th>Campus</th>
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
                                    <td><Link to={`/student/edit/${student.id}`}><button> EDIT STUDENT </button></Link></td>
                                    <td><button value={student.id} onClick={this.handleDelete}> DELETE STUDENT </button></td>
                                    </tr>
                            )} else {
                                return (
                                    <tr key={student.id}>
                                    <td key={student.id} ><Link to={`/student/${student.id}`}>{ student.name }</Link></td>
                                    <td>No Campus Assigned</td>
                                    <td><Link to={`/student/edit/${student.id}`}><button> EDIT STUDENT </button></Link></td>
                                    <td><button value={student.id} onClick={this.handleDelete}> DELETE STUDENT </button></td>
                                    </tr>
                            )}
                        }
                    )}
                </table>
                <AddStudent fetchStudents={this.fetchStudents}/>
            </div>
        )
    }
}