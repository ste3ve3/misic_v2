import * as actions from '../actionTypes';

export const getLoggedInUser = ({ loggedInUser = null }) => {
    return {
        type: actions.GET_LOGGEDIN_USER,
        payload: {
            loggedInUser
        }
    };
};

export const getUsers = ({ users = [] }) => {
    return {
        type: actions.GET_ALL_USERS,
        payload: {
            users
        }
    };
};
export const editRole = (user) => ({
    type: actions.EDIT_USER,
    payload: {
        user
    }
});
export const deleteUser = (id) => ({
    type: actions.DELETE_USER,
    payload: {
        id
    }
});