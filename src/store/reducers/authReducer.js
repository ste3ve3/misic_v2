import { GET_LOGGEDIN_USER, GET_ALL_USERS, EDIT_USER, DELETE_USER, USER_ERROR } from '../actionTypes';

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
            case EDIT_USER:
            return {
                ...state,
                error: null,
                users: state.users.map((user) => (user._id !== action.payload.user._id ? user : action.payload.user))
            };
            case DELETE_USER:
            return {
                ...state,
                error: null,
                users: state.users.filter((user) => user._id !== action.payload.id)
            };
            case USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        default:
            return state;
    }
};

export default authReducer;
