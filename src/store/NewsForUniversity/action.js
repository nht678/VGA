import { message } from 'antd';
import newsForUniversityService from "../../services/NewsForUniversityService";

export const GET_NEWS = 'GET_NEWS';
export const ADD_NEWS = 'ADD_NEWS';
export const UPDATE_NEWS = 'UPDATE_NEWS';
export const DELETE_NEWS = 'DELETE_NEWS';

export function actGetNews(data) {
    return {
        type: GET_NEWS,
        payload: data,
    };
}

export function actAddNews(data) {
    return {
        type: ADD_NEWS,
        payload: data,
    };
}

export function actUpdateNews(data) {
    return {
        type: UPDATE_NEWS,
        payload: data,
    };
}

export function actDeleteNews(id) {
    return {
        type: DELETE_NEWS,
        payload: id,
    };
}

export const actGetNewsAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.getNewsForUniversity({ page, pageSize, search });
        dispatch(actGetNews(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddNewsAsync = (data) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.addNewsForUniversity(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddNews(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateNewsAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.updateNewsForUniversity({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateNews(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteNewsAsync = (id) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.deleteNewsForUniversity(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            dispatch(actDeleteNews(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
};

