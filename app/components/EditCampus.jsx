import React, { Component } from 'react';
import axios from 'axios'
import { Link, browserHistory } from 'react-router-dom';
import { Redirect } from 'react-router'

export default class EditCampus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campus: {},
            campusNameEntry: '',
            campusImg: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        let campusId = this.props.match.params.id;
        axios.get(`/api/campus/${campusId}`)
        .then(res => res.data)
        .then(campus => {
            this.setState({
                campus,
                campusNameEntry: campus.name,
                campusImg: campus.image
            })
        })
    }

    handleChange (category, e) {
        this.setState({
            [category]: e.target.value
        })
    }

    handleSubmit (e) {
        e.preventDefault();
        let campusName = this.state.campusNameEntry;
        let campusImg = this.state.campusImg;
        let editCampus = { name: campusName, image: campusImg }
        axios.put(`/api/campus/${this.state.campus.id}`, editCampus)
        .then(campus => {
            console.log('updated! ', campus.data);
            this.setState({redirect: true})
        })
        .catch(error => console.log(error))
    }
    

    render () {
        if (this.state.redirect){
            return <Redirect to={`/campus/${this.state.campus.id}`} />
        }
        return (
            <div>
                <h2>Edit <Link to={`/campus/${this.state.campus.id}`}>{this.state.campus.name}</Link></h2>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        Campus Name
                        <br />
                        <input style={{"width": "40%"}} type="text" name="campusName" value={this.state.campusNameEntry} autoComplete="off" onChange={(e) => this.handleChange("campusNameEntry", e)} value={this.state.campusNameEntry}></input>
                        <br />
                        Campus Image Link
                        <br />
                        <input style={{"width": "40%"}} type="text" name="campusImg" value={this.state.campusImg} autoComplete="off" onChange={(e) => this.handleChange("campusImg", e)} value={this.state.campusImg}></input>
                        <br />
                        <input type="submit"></input>
                    </fieldset>
                </form>
             </div>
        )
    }

}