import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import projectReducer from './projectReducer';
import leaderReducer from './leaderReducer';
import blogReducer from './blogReducer';
import testimonialReducer from './testimonialReducer';
import fatherReducer from './fatherReducer';
import messageReducer from './messageReducer';
import newsReducer from './newsReducer';
import announcementReducer from './announcementReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    project: projectReducer,
    leader: leaderReducer,
    blog: blogReducer,
    testimonial: testimonialReducer,
    father: fatherReducer,
    message: messageReducer,
    news: newsReducer,
    announcement: announcementReducer
});

export default reducer;
