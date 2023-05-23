import * as actions from '../actionTypes';

export const getAllBlogs = ({ blogs = [], paginationDetails = null }) => {
    return {
        type: actions.GET_ALL_BLOGS,
        payload: {
            blogs,
            paginationDetails
        }
    };
};

export const addBlog = (blog) => ({
    type: actions.ADD_BLOG,
    payload: {
        blog
    }
});

export const editBlog = (blog) => ({
    type: actions.EDIT_BLOG,
    payload: {
        blog
    }
});

export const deleteBlog = (id) => ({
    type: actions.DELETE_BLOG,
    payload: {
        id
    }
});
