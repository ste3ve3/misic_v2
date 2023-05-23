import { ADD_LEADER, DELETE_LEADER, EDIT_LEADER, GET_ALL_LEADERS, LEADER_ERROR } from '../actionTypes';

const initLeaderState = {
    error: null,
    leaders: [],
    loading: true
};

const leaderReducer = (state = initLeaderState, action) => {
    switch (action.type) {
        case GET_ALL_LEADERS:
            return {
                ...state,
                error: null,
                loading: false,
                leaders: [...action.payload.leaders]
            };
        case ADD_LEADER:
            return {
                ...state,
                error: null,
                leaders: [action.payload.leader, ...state.leaders]
            };
        case EDIT_LEADER:
            return {
                ...state,
                error: null,
                leaders: state.leaders.map((leader) => (leader._id !== action.payload.leader._id ? leader : action.payload.leader))
            };
        case DELETE_LEADER:
            return {
                ...state,
                error: null,
                leaders: state.leaders.filter((leader) => leader._id !== action.payload.id)
            };
        case LEADER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default leaderReducer;
