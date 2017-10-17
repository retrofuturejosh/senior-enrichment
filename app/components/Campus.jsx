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
            campusId: '',
            campuses: [],
            campusImg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount () {
        axios.get('/api/campus')
        .then(res => res.data)
        .then(campuses => {
            this.setState({ campuses })
        })
    }

    handleSubmit (e) {
        e.preventDefault();
        let campusName = this.state.campusNameEntry;
        let campusImg = this.state.campusImg;
        axios.post("/api/campus", { name: campusName, image: campusImg })
        .then(campus => {
            console.log('posted! ', campus.data.id);
            this.setState({campusId: campus.data.id, redirect: true});
        })
    }

    handleChange (category, e) {
        this.setState({
            [category]: e.target.value
        })
    }
      

    render (props) { 
        if (this.state.redirect){
            return <Redirect to={`/campus/${this.state.campusId}`}/>;
        } else return (
            <div>
                <div>
                    <h2>Add Campus</h2>
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <input type="text" name="campusName" placeholder="Campus Name" autoComplete="off" onChange={(e) => this.handleChange("campusNameEntry", e)} value={this.state.campusNameEntry}></input>
                            <br />
                            <input type="text" name="campusImg" placeholder="Campus Image Link" autoComplete="off" onChange={(e) => this.handleChange("campusImg", e)} value={this.state.campusImg}></input>
                            <br />
                            <input type="submit"></input>
                        </fieldset>
                    </form>
                </div>
                <div>
                    <h1>Campuses</h1>
                    <ul>
                        {
                            this.state.campuses.map(campus => {
                                return (
                                    <li key={campus.id} ><Link to={`/campus/${campus.id}`}>{ campus.name }</Link></li>
                                )
                            }
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}