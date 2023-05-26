import { ADD_FATHER, DELETE_FATHER, EDIT_FATHER, GET_ALL_FATHERS, FATHER_ERROR } from 'store/actionTypes';

const initFatherState = {
    error: null,
    fathers: [],
    loading: true
};

const fatherReducer = (state = initFatherState, action) => {
    switch (action.type) {
        case GET_ALL_FATHERS:
            return {
                ...state,
                error: null,
                loading: false,
                fathers: [...action.payload.fathers]
            };
        case ADD_FATHER:
            return {
                ...state,
                error: null,
                fathers: [action.payload.father, ...state.fathers]
            };
        case EDIT_FATHER:
            return {
                ...state,
                error: null,
                fathers: state.fathers.map((father) => (father._id !== action.payload.father._id ? father : action.payload.father))
            };
        case DELETE_FATHER:
            return {
                ...state,
                error: null,
                fathers: state.fathers.filter((father) => father._id !== action.payload.id)
            };
        case FATHER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default fatherReducer;
