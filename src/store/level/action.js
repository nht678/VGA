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

export const actLevelGetAsync = ({ page, pagesize, search }) => async (dispatch) => {
    try {
        const response = await levelService.getLevels({ page, pagesize, search });
        dispatch(actLevelGet(response));
    } catch (error) {
        console.error(error);
    }
};

export const actLevelAddAsync = (data) => async (dispatch) => {
    try {
        const response = await levelService.addLevel(data);
        dispatch(actAddLevel(response));
    } catch (error) {
        console.error(error);
    }
};

export const actLevelUpdateAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await levelService.updateLevel({ formData, id });
        dispatch(actLevelUpdate(response));
    } catch (error) {
        console.error(error);
    }
};

export const actLevelDeleteAsync = (id) => async (dispatch) => {
    try {
        await levelService.deleteLevel(id);
        dispatch(actLevelDelete(id));
    } catch (error) {
        console.error(error);
    }
};


