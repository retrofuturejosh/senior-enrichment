import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Campus from './Campus';
import Student from './Student';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';

export default class Root extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            campuses: [],
            students: [],
            selectedStudent: '',
            selectedCampus: ''
        }

    }

    componentDidMount () {
        let campusPromise = axios.get('/api/campus')
          .then(res => res.data)
          .then(campuses => {
              this.setState({ campuses })
          })
        let studentPromise = axios.get('/api/student')
        .then(res => res.data)
        .then(students => {
            this.setState({ students })
        })
        Promise.all([studentPromise, campusPromise])
        .then(values => console.log('fetched students and campuses', this.state))
      }
    
    render(props) {
        return (

                <div>
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route exact path="/campus" render={() => <Campus campuses={this.state.campuses}/>} />
                        <Route path="/student/:id" component={SingleStudent}/>
                        <Route path="/campus/:id" component={SingleCampus} />
                        <Route path="/student/" render={() => <Student students={this.state.students}/>}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>

        )
    }

}