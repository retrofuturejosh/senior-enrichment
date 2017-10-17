import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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

    handleDelete (e) {
        e.preventDefault();
        let studentId = this.state.student.id;
        let savedId = this.state.campus.id
        axios.delete(`/api/student/${studentId}`)
        .then(student => {
            this.setState({redirect: true})
        })
    }

    render(props) {

        if(this.state.redirect) {
            if (savedName === null){
                return <Redirect to={`/`}/>;
            } else return <Redirect to={`/studentremoved/${savedName}`}/>;
        } else return (
            <div>
                <h1>{this.state.student.name}</h1>
                <div>
                    <ul>
                        <li>Campus: <Link to={`/campus/${this.state.campus.id}`}>{this.state.campus.name} </Link></li>
                        <li>Email: {this.state.student.email}</li>
                        <li>GPA: {this.state.student.gpa} </li>
                    </ul>
                </div>
                <div>
                    <Link to={`/student/edit/${this.state.student.id}`}><button> EDIT STUDENT </button></Link> 
                </div>
                <br />
                <br />
                <div>
                    <button onClick={this.handleDelete}> DELETE STUDENT </button>
                </div>
            </div>
        )
    }
}