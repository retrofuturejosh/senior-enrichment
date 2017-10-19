import axios from 'axios';

//GET ALL CAMPUSES
//Action Name
const FETCH_CAMPUSES = "FETCH_CAMPUSES";


//Action Creator
export function fetchCampuses(campuses) {
    return {
        type: FETCH_CAMPUSES,
        campuses
    }
}

//Reducer
export default function campusesReducer (state = [], action) {
    switch (action.type) {

        case FETCH_CAMPUSES:
        return action.campuses

        default:
        return state;
    }
}

//Thunk
export function fetchCampusesThunk(){
    return function thunk (dispatch) {
        return axios.get('/api/campus')
            .then(res => res.data)
            .then(campuses => {
                const action = fetchCampuses(campuses);
                return dispatch(action);
            })
            .catch((error) => console.log(error))
    }
}