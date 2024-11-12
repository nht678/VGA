import { message } from "antd";
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
        if (response) {
            dispatch(actAddLevel(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actLevelUpdateAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await levelService.updateLevel({ formData, id });
        if (response) {
            message.success('Cập nhật thành công');
            dispatch(actLevelUpdate(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actLevelDeleteAsync = (id) => async (dispatch) => {
    try {
        const response = await levelService.deleteLevel(id);
        if (response) {
            message.success('Xóa thành công');
            dispatch(actLevelDelete(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');

    }
};


