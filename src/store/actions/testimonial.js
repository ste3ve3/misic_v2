import * as actions from '../actionTypes';

export const getAllTestimonials = ({ testimonials = [], paginationDetails = null }) => {
    return {
        type: actions.GET_ALL_TESTIMONIALS,
        payload: {
            testimonials,
            paginationDetails
        }
    };
};

export const addTestimonial = (testimonial) => ({
    type: actions.ADD_TESTIMONIAL,
    payload: {
        testimonial
    }
});

export const editTestimonial = (testimonial) => ({
    type: actions.EDIT_TESTIMONIAL,
    payload: {
        testimonial
    }
});

export const deleteTestimonial = (id) => ({
    type: actions.DELETE_TESTIMONIAL,
    payload: {
        id
    }
});
