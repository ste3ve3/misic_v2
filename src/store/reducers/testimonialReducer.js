import { ADD_TESTIMONIAL, DELETE_TESTIMONIAL, EDIT_TESTIMONIAL, GET_ALL_TESTIMONIALS, TESTIMONIAL_ERROR } from 'store/actionTypes';

const initTestimonialState = {
    error: null,
    testimonials: [],
    loading: true,
    paginationDetails: null
};

const testimonialReducer = (state = initTestimonialState, action) => {
    switch (action.type) {
        case GET_ALL_TESTIMONIALS:
            return {
                ...state,
                error: null,
                loading: false,
                testimonials: [...action.payload.testimonials],
                paginationDetails: action.payload.paginationDetails
            };
        case ADD_TESTIMONIAL:
            return {
                ...state,
                error: null,
                testimonials: [action.payload.testimonial, ...state.testimonials]
            };
        case EDIT_TESTIMONIAL:
            return {
                ...state,
                error: null,
                testimonials: state.testimonials.map((testimonial) =>
                    testimonial._id !== action.payload.testimonial._id ? testimonial : action.payload.testimonial
                )
            };
        case DELETE_TESTIMONIAL:
            return {
                ...state,
                error: null,
                testimonials: state.testimonials.filter((testimonial) => testimonial._id !== action.payload.id)
            };
        case TESTIMONIAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default testimonialReducer;
