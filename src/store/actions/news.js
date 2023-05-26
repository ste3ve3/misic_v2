import * as actions from '../actionTypes';

export const getAllNews = ({ news = [] }) => {
    return {
        type: actions.GET_ALL_NEWS,
        payload: {
            news
        }
    };
};

export const addNews = (news) => ({
    type: actions.ADD_NEWS,
    payload: {
        news
    }
});

export const editNews = (news) => ({
    type: actions.EDIT_NEWS,
    payload: {
        news
    }
});

export const deleteNews = (id) => ({
    type: actions.DELETE_NEWS,
    payload: {
        id
    }
});
