import React, { Component } from 'react';
import axios from 'axios'
import { Link, browserHistory } from 'react-router-dom';
import { Redirect } from 'react-router'

export default class EditStudent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campuses: [],
            student: {},
            firstName: '',
            lastName: '',
            email: '',
            gpa: '',
            campusId: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let studentId = this.props.match.params.id;
        axios.get(`/api/student/${studentId}`)
        .then(res => res.data)
        .then(student => {
            let firstLast = student.name.split(' ');
            this.setState({ student,
                firstName: firstLast[0],
                lastName: firstLast[1],
                email: student.email,
                gpa: student.gpa,
                campusId: student.campusId
            })
        })
        .catch(error => console.log('BUMMER ', error));
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
        let campusId = this.state.student.campusId;
        let editStudent = {
            name: this.state.firstName + ' ' + this.state.lastName,
            email: this.state.email,
            gpa: this.state.gpa,
            campusId: this.state.campusId
        }

        axios.put(`/api/student/${this.state.student.id}`, editStudent)
        .then(student => {
            console.log('updated! ', student.data);
            this.setState({redirect: true})
        })
        .catch(error => console.log(error))
    }

    render (props) {
        if(this.state.redirect){
            return <Redirect to={`/student/${this.state.student.id}`}/>
        }
        return (
            <div>
            <div>
                <h2>EDIT {this.state.student.name}</h2>
            </div>
            <div>
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
                        {
                            this.state.campuses.map(campus => {
                                if (campus.id === this.state.student.campusId){
                                    return <option selected value={campus.id} key={campus.id}>{campus.name}</option>
                                } else return <option value={campus.id} key={campus.id}>{campus.name}</option>
                            })
                        }
                    </select>
                    <input type="submit"></input>
                </fieldset>
            </form>
            </div>
            </div>
        )
    }
}

<select name="cars">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="fiat">Fiat</option>
  <option value="audi">Audi</option>
</select>