import { message } from "antd";
import { el } from "date-fns/locale";
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

export const actLevelGetAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await levelService.getLevels({ page, pageSize, search });
        if (response.status === 200) {
            dispatch(actLevelGet(response.data));
        }
    } catch (error) {
        console.error(error);
        message.error('Lấy dữ liệu thất bại');
    }
};

export const actLevelAddAsync = (data) => async (dispatch) => {
    try {
        const response = await levelService.addLevel(data);
        if (response.status === 201 || response.status === 200) {
            dispatch(actAddLevel(response.data));
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
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actLevelUpdate(response.data));
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
        if (response.status === 200) {
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


