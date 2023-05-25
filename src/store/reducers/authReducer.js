import { GET_LOGGEDIN_USER, GET_ALL_USERS } from '../actionTypes';

const initProjectState = {
    error: null,
    users: [],
    loggedInUser : null,
    loading: true
};

const authReducer = (state = initProjectState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                error: null,
                loading: false,
                users: [...action.payload.users]
        };
        case GET_LOGGEDIN_USER:
            return {
                ...state,
                error: null,
                loading: false,
                loggedInUser: {...action.payload.loggedInUser}
            };

        default:
            return state;
    }
};

export default authReducer;
