import * as actions from '../actionTypes';

export const getLoggedInUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    return {
        type: actions.GET_LOGGEDIN_USER,
        payload: {
            loggedInUser: loggedInUser || null
        }
    };
};


export const getUsers = ({ payments = [] }) => {
    return {
        type: actions.GET_ALL_USERS,
        payload: {
            payments
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