import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import projectReducer from './projectReducer';
import leaderReducer from './leaderReducer';
import blogReducer from './blogReducer';
import testimonialReducer from './testimonialReducer';
import fatherReducer from './fatherReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    project: projectReducer,
    leader: leaderReducer,
    blog: blogReducer,
    testimonial: testimonialReducer,
    father: fatherReducer
});

export default reducer;
