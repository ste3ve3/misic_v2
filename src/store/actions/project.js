import * as actions from '../actionTypes';

export const getAllProjects = ({ projects = [], paginationDetails = null }) => {
    return {
        type: actions.GET_ALL_PROJECTS,
        payload: {
            projects,
            paginationDetails
        }
    };
};

export const addProject = (project) => ({
    type: actions.ADD_PROJECT,
    payload: {
        project
    }
});

export const editProject = (project) => ({
    type: actions.EDIT_PROJECT,
    payload: {
        project
    }
});

export const deleteProject = (id) => ({
    type: actions.DELETE_PROJECT,
    payload: {
        id
    }
});
