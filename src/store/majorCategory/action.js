import { message } from 'antd';
import majorCategoryService from '../../services/majorCategoryService';

export const GET_MAJOR_CATEGORIES = 'GET_MAJOR_CATEGORIES';
export const ADD_MAJOR_CATEGORY = 'ADD_MAJOR_CATEGORY';
export const UPDATE_MAJOR_CATEGORY = 'UPDATE_MAJOR_CATEGORY';
export const DELETE_MAJOR_CATEGORY = 'DELETE_MAJOR_CATEGORY';

export function actGetMajorCategories(data) {
    return {
        type: GET_MAJOR_CATEGORIES,
        payload: data,
    };
}

export function actAddMajorCategory(data) {
    return {
        type: ADD_MAJOR_CATEGORY,
        payload: data,
    };
}

export function actUpdateMajorCategory(data) {
    return {
        type: UPDATE_MAJOR_CATEGORY,
        payload: data,
    };
}

export function actDeleteMajorCategory(id) {
    return {
        type: DELETE_MAJOR_CATEGORY,
        payload: id,
    };
}

export const actGetMajorCategoriesAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await majorCategoryService.getMajorCategories({ page, pageSize, search });
        dispatch(actGetMajorCategories(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddMajorCategoryAsync = (data) => async (dispatch) => {
    try {
        const response = await majorCategoryService.addMajorCategory(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddMajorCategory(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateMajorCategoryAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await majorCategoryService.updateMajorCategory({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateMajorCategory(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteMajorCategoryAsync = (id) => async (dispatch) => {
    try {
        const response = await majorCategoryService.deleteMajorCategory(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            dispatch(actDeleteMajorCategory(id));
        } else {
            message.error('Xóa thất bại');
        }
    }
    catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
}

export function resetMajorCategorySuccess() {
    return {
        type: 'RESET_MAJOR_CATEGORY',
    };
}
