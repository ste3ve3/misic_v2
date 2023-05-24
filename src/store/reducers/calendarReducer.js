import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, GET_ALL_EVENTS, EVENT_ERROR, HIGHLIGHT_EVENT } from '../actionTypes';

const initEventtate = {
    error: null,
    events: [],
    loading: true
};

const eventReducer = (state = initEventtate, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS:
            return {
                ...state,
                error: null,
                loading: false,
                events: [...action.payload.events]
            };
        case ADD_EVENT:
            return {
                ...state,
                error: null,
                events: [action.payload.event, ...state.events]
            };
        case EDIT_EVENT:
            return {
                ...state,
                error: null,
                events: state.events.map((event) => (event._id !== action.payload.event._id ? event : action.payload.event))
            };
        case HIGHLIGHT_EVENT:
            return {
                ...state,
                error: null,
                events: state.events.map((event) => (event._id !== action.payload.event._id ? event : action.payload.event))
            };
        case DELETE_EVENT:
            return {
                ...state,
                error: null,
                events: state.events.filter((event) => event._id !== action.payload.id)
            };
        case EVENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default eventReducer;
