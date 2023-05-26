import { DELETE_MESSAGE, GET_ALL_MESSAGES } from 'store/actionTypes';

const messageReducer = (
    state = {
        messages: [],
        loading: true
    },
    action
) => {
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return {
                ...state,
                loading: false,
                messages: [...action.payload.messages]
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter((message) => message._id !== action.payload.id)
            };
        default:
            return state;
    }
};

export default messageReducer;
