import * as actions from '../actionTypes';

export const getAllFathers = ({ fathers = [] }) => {
    return {
        type: actions.GET_ALL_FATHERS,
        payload: {
            fathers
        }
    };
};

export const addFather = (father) => ({
    type: actions.ADD_FATHER,
    payload: {
        father
    }
});

export const editFather = (father) => ({
    type: actions.EDIT_FATHER,
    payload: {
        father
    }
});

export const deleteFather = (id) => ({
    type: actions.DELETE_FATHER,
    payload: {
        id
    }
});
