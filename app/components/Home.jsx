import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios'


import { fetchCampusesThunk } from '../reducers/campus';
import store from '../store'

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {fetchCampusesThunk }
}

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = store.getState();
    }

    componentDidMount() {
        this.unsubscribeFromStore = store.subscribe(() => {
            this.setState(store.getState());
         });
        const campusesThunk = this.props.fetchCampusesThunk();
        let storePromise = store.dispatch(campusesThunk);
        storePromise.then(()=> {
            this.setState(store.getState())
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromStore();
    }

    render() {
        return (
            <div id="current-component">
                <div>
                    <div id="campus-top">
                        <h3 id="campus-float">Campuses</h3>
                        <Link to="/campus"><button className="float-right" id="expand-input-40">Add Campus</button></Link>
                    </div>
                    <br />
                    <table id="campus-table" style={{ "width": "75%" }}>
                        <thead>
                        <tr>
                            <th>Campus</th>
                            <th>Edit Campus Info</th>
                            <th>Add/Remove Students</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.campuses.map(campus => {
                                return (
                                    <tr key={campus.id}>
                                        <td key={campus.id} ><Link to={`/campus/${campus.id}`}>{campus.name}</Link></td>
                                        <td><Link to={`/campus/edit/${campus.id}`}><button >Edit Campus</button></Link></td>
                                        <td><Link to={`/campus/${campus.id}`}><button >Add/Remove</button></Link></td>
                                    </tr>
                                )
                            }
                            )}
                            </tbody>
                    </table>
                </div>
                <br />
                <br />
            </div>
        )
    }
}

const HomeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

export default HomeContainer