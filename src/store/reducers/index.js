import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import projectReducer from './projectReducer';
import leaderReducer from './leaderReducer';
import blogReducer from './blogReducer';
import eventReducer from './calendarReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    project: projectReducer,
    leader: leaderReducer,
    blog: blogReducer,
    calendar: eventReducer
});

export default reducer;
