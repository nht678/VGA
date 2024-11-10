import { message } from 'antd';
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

export const actUniversityGetAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await universityService.getUniversities({ page, pageSize, search });
        dispatch(actUniversityGet(response));
    } catch (error) {
        console.error(error);
    }
};


export const actUniversityAddAsync = (data) => async (dispatch) => {
    try {
        const response = await universityService.addUniversity(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddUniversity(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
}

export const actUniversityUpdateAsync = (data) => async (dispatch) => {
    try {
        const response = await universityService.updateUniversity(data);
        console.log('response:', response);
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUniversityUpdate(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
}

export const actUniversityDeleteAsync = (id) => async (dispatch) => {
    try {
        const response = await universityService.deleteUniversity(id);
        if (response.status === 200 || response.status === 201) {
            dispatch(actUniversityDelete(id));
            message.success('Xóa thành công');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
}

