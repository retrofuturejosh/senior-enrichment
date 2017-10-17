import React, { Component } from 'react';
import axios from 'axios'
import { Link, browserHistory } from 'react-router-dom';
import { Redirect } from 'react-router'

export default class Campus extends Component {
    constructor (props) {
        super(props)
        this.state = {
            campusNameEntry: '',
            redirect: false,
            campusId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
        let campusName = this.state.campusNameEntry;
        axios.post("/api/campus", { name: campusName })
        .then(campus => {
            console.log('posted! ', campus.data.id);
            this.setState({campusId: campus.data.id, redirect: true});
        })
    }

    handleChange (e) {
        this.setState({campusNameEntry : e.target.value})
        console.log(this.state.campusNameEntry)
    }
      

    render (props) { 
        if (this.state.redirect){
            return <Redirect to={`/campus/${this.state.campusId}`}/>;
        } else return (
            <div>
                <div>
                    <h1>Campuses</h1>
                    <ul>
                        {
                            this.props.campuses.map(campus => {
                                return (
                                    <li key={campus.id} ><Link to={`/campus/${campus.id}`}>{ campus.name }</Link></li>
                                )
                            }
                        )}
                    </ul>
                </div>

                <div>
                    <h2>Add Campus</h2>
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <input type="text" name="campusName" placeholder="Campus Name" autoComplete="off" onChange={this.handleChange} value={this.state.campusNameEntry}></input>
                            <br />
                            <input type="submit"></input>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}