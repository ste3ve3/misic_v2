import * as actions from '../actionTypes';

export const getAllLeaders = ({ leaders = [] }) => {
    return {
        type: actions.GET_ALL_LEADERS,
        payload: {
            leaders
        }
    };
};

export const addLeader = (leader) => ({
    type: actions.ADD_LEADER,
    payload: {
        leader
    }
});

export const editLeader = (leader) => ({
    type: actions.EDIT_LEADER,
    payload: {
        leader
    }
});

export const deleteLeader = (id) => ({
    type: actions.DELETE_LEADER,
    payload: {
        id
    }
});
