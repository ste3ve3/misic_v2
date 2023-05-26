import * as actions from '../actionTypes';

export const getAllMessages = ({ messages = [] }) => {
    return {
        type: actions.GET_ALL_MESSAGES,
        payload: {
            messages
        }
    };
};

export const deleteMessage = (id) => ({
    type: actions.DELETE_MESSAGE,
    payload: {
        id
    }
});
