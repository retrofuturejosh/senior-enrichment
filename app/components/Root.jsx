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
import EditCampus from './EditCampus'

const Root = (props) => {
    
    return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route exact path="/campus" component={Campus}/>
                    <Route path="/student/edit/:id" component={EditStudent}/>
                    <Route path="/campus/edit/:id" component={EditCampus}/>
                    <Route path="/student/:id" component={SingleStudent}/>
                    <Route path="/campus/:id" component={SingleCampus} />
                    <Route path="/student/" component={Student}/>
                    <Route path="/campusremoved/:name" component={CampusRemoved} />
                    <Route path="/studentremoved/:name" component={StudentRemoved} />
                    <Route exact path="/" component={Home}/>
                </Switch>
            </div>
    )
}


export default Root


