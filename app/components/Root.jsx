import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Campus from './Campus';
import Student from './Student';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import CampusRemoved from './CampusRemoved';
import Navbar from './navbar';
import EditStudent from './EditStudent';
import StudentRemoved from './StudentRemoved';
import EditCampus from './EditCampus';
import { Link, browserHistory } from 'react-router-dom';

const Root = (props) => {

    return (
        <div id="whole-page">
            <Navbar />
            <Switch>
                <div id="mainapp">
                    <Route path="/home" component={Home} />
                    <Route exact path="/student/edit/:id" component={EditStudent} />
                    <Route exact path="/campus/edit/:id" component={EditCampus} />
                    <Route exact path="/student/:id" component={SingleStudent} />
                    <Route exact path="/campus/:id" component={SingleCampus} />
                    <Route path="/campusremoved/:name" component={CampusRemoved} />
                    <Route path="/studentremoved/:name" component={StudentRemoved} />
                    <Route exact path="/campus" component={Campus} />
                    <Route exact path="/student/" component={Student} />
                    <Route exact path="/" component={Home} />
                </div>
            </Switch>
        </div>
    )
}


export default Root


