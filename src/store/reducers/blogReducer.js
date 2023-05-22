import { ADD_BLOG, DELETE_BLOG, EDIT_BLOG, GET_ALL_BLOGS, BLOG_ERROR } from '../actionTypes';

const initBlogtate = {
    error: null,
    blogs: [],
    loading: true,
    paginationDetails: null
};

const blogReducer = (state = initBlogtate, action) => {
    switch (action.type) {
        case GET_ALL_BLOGS:
            return {
                ...state,
                error: null,
                loading: false,
                blogs: [...action.payload.blogs],
                paginationDetails: action.payload.paginationDetails
            };
        case ADD_BLOG:
            return {
                ...state,
                error: null,
                blogs: [action.payload.blog, ...state.blogs]
            };
        case EDIT_BLOG:
            return {
                ...state,
                error: null,
                blogs: state.blogs.map((blog) => (blog._id !== action.payload.blog._id ? blog : action.payload.blog))
            };
        case DELETE_BLOG:
            return {
                ...state,
                error: null,
                blogs: state.blogs.filter((blog) => blog._id !== action.payload.id)
            };
        case BLOG_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default blogReducer;
