import universityService from "src/services/universityService";

export const ACT_UNIVERSITY_GET = 'ACT_UNIVERSITY_GET';
export const ADD_UNIVERSITY = 'ADD_UNIVERSITY';
export const UPDATE_UNIVERSITY = 'UPDATE_UNIVERSITY';
export const DELETE_UNIVERSITY = 'DELETE_UNIVERSITY';

export function actUniversityGet(data) {
    return {
        type: ACT_UNIVERSITY_GET,
        payload: data,
    };
}

export function actAddUniversity(data) {
    return {
        type: ADD_UNIVERSITY,
        payload: data,
    };
}
export function actUniversityUpdate(data) {
    return {
        type: UPDATE_UNIVERSITY,
        payload: data,
    };
}
export function actUniversityDelete(id) {
    return {
        type: DELETE_UNIVERSITY,
        payload: id,
    };
}
export const resetUniversitySuccess = () => ({
    type: 'RESET_UNIVERSITY_SUCCESS',
});

export const actUniversityGetAsync = ({ page, pageSize }) => async (dispatch) => {
    try {
        const response = await universityService.getUniversities(page, pageSize);
        dispatch(actUniversityGet(response));
    } catch (error) {
        console.error(error);
    }
};


export const actUniversityAddAsync = (data) => async (dispatch) => {
    try {
        const response = await universityService.addUniversity(data);
        dispatch(actAddUniversity(response));
    } catch (error) {
        console.error(error);
    }
}

export const actUniversityUpdateAsync = (data) => (dispatch) => {
    try {
        const response = universityService.updateUniversity(data);
        dispatch(actUniversityUpdate(response));
    } catch (error) {
        console.error(error);
    }
}

export const actUniversityDeleteAsync = (id) => (dispatch) => {
    try {
        universityService.deleteUniversity(id);
        dispatch(actUniversityDelete(id));
    } catch (error) {
        console.error(error);
    }
}

