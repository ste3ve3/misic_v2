import * as actions from '../actionTypes';

export const getAllEvents = ({ events = [] }) => {
    return {
        type: actions.GET_ALL_EVENTS,
        payload: {
            events
        }
    };
};

export const addEvent = (event) => ({
    type: actions.ADD_EVENT,
    payload: {
        event
    }
});

export const editEvent = (event) => ({
    type: actions.EDIT_EVENT,
    payload: {
        event
    }
});

export const deleteEvent = (id) => ({
    type: actions.DELETE_EVENT,
    payload: {
        id
    }
});

export const highlightEvent = (event) => ({
    type: actions.HIGHLIGHT_EVENT,
    payload: {
        event
    }
});
