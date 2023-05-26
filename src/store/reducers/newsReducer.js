import { ADD_NEWS, DELETE_NEWS, EDIT_NEWS, GET_ALL_NEWS } from 'store/actionTypes';

const newsReducer = (
    state = {
        news: []
    },
    action
) => {
    switch (action.type) {
        case GET_ALL_NEWS:
            return {
                ...state,
                news: [...action.payload.news]
            };
        case ADD_NEWS:
            return {
                ...state,
                news: [action.payload.news, ...state.news]
            };
        case EDIT_NEWS:
            return {
                ...state,
                news: state.news.map((news) => (news._id !== action.payload.news._id ? news : action.payload.news))
            };
        case DELETE_NEWS:
            return {
                ...state,
                news: state.news.filter((news) => news._id !== action.payload.id)
            };
        default:
            return state;
    }
};

export default newsReducer;
