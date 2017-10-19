import React, { Component } from 'react';
import axios from 'axios'
import { Link, browserHistory } from 'react-router-dom';
import { Redirect } from 'react-router'

let savedName

export default class EditCampus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            campus: {},
            campusNameEntry: '',
            campusImg: '',
            redirect: false,
            deleteRedirect: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
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

    handleDelete(e) {
        e.preventDefault();
        let campusId = this.state.campus.id;
        savedName = this.state.campus.name
        axios.delete(`/api/campus/${campusId}`)
            .then(success => {
                this.setState({ deleteRedirect: true })
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleChange(category, e) {
        this.setState({
            [category]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let campusName = this.state.campusNameEntry;
        let campusImg = this.state.campusImg;
        let editCampus = { name: campusName, image: campusImg }
        axios.put(`/api/campus/${this.state.campus.id}`, editCampus)
            .then(campus => {
                console.log('updated! ', campus.data);
                this.setState({ redirect: true })
            })
            .catch(error => console.log(error))
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={`/campus/${this.state.campus.id}`} />
        }
        if (this.state.deleteRedirect) {
            return <Redirect to={`/campusremoved/${savedName}`} />
        }
        return (
            <div id="current-component">
                <div id="campus-editor">
                    <h2><Link to={`/campus/${this.state.campus.id}`}>{this.state.campus.name}</Link></h2>
                    <button className="edit-delete" id="expand-input-40" onClick={this.handleDelete}>Delete Campus</button>
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <h4>Campus Name</h4>
                            <input id="expand-input-40" type="text" name="campusName" value={this.state.campusNameEntry} autoComplete="off" onChange={(e) => this.handleChange("campusNameEntry", e)} value={this.state.campusNameEntry}></input>
                            <br />
                            <br />
                            <h4>Campus Image Link</h4>
                            <input id="expand-input-40" type="text" name="campusImg" value={this.state.campusImg} autoComplete="off" onChange={(e) => this.handleChange("campusImg", e)} value={this.state.campusImg}></input>
                            <br />
                            <br />
                            <input id="expand-input-40" className="button" type="submit" value="Submit Edit"></input>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }

}