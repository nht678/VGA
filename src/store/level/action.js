import levelService from "src/services/levelService";

export const ACT_LEVEL_GET = 'ACT_LEVEL_GET';
export const ADD_LEVEL = 'ADD_LEVEL';
export const UPDATE_LEVEL = 'UPDATE_LEVEL';
export const DELETE_LEVEL = 'DELETE_LEVEL';

export function actLevelGet(data) {
    return {
        type: ACT_LEVEL_GET,
        payload: data,
    };
}

export function actAddLevel(data) {
    return {
        type: ADD_LEVEL,
        payload: data,
    };
}
export function actLevelUpdate(data) {
    return {
        type: UPDATE_LEVEL,
        payload: data,
    };
}
export function actLevelDelete(id) {
    return {
        type: DELETE_LEVEL,
        payload: id,
    };
}
export const resetLevelSuccess = () => ({
    type: 'RESET_LEVEL_SUCCESS',
});

export const actLevelGetAsync = () => async (dispatch) => {
    try {
        const response = await levelService.getLevels();
        dispatch(actLevelGet(response));
    } catch (error) {
        console.error(error);
    }
};

