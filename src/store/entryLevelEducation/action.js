import { message } from "antd";
import entryLevelEducationService from "../../services/entryLevelEducationService";

export const GET_ENTRY_LEVEL_EDUCATIONS = "GET_ENTRY_LEVEL_EDUCATIONS";
export const ADD_ENTRY_LEVEL_EDUCATION = "ADD_ENTRY_LEVEL_EDUCATION";
export const UPDATE_ENTRY_LEVEL_EDUCATION = "UPDATE_ENTRY_LEVEL_EDUCATION";
export const DELETE_ENTRY_LEVEL_EDUCATION = "DELETE_ENTRY_LEVEL_EDUCATION";

export function actGetEntryLevelEducations(data) {
    return {
        type: GET_ENTRY_LEVEL_EDUCATIONS,
        payload: data,
    };
}

export function actAddEntryLevelEducation(data) {
    return {
        type: ADD_ENTRY_LEVEL_EDUCATION,
        payload: data,
    };
}

export function actUpdateEntryLevelEducation(data) {
    return {
        type: UPDATE_ENTRY_LEVEL_EDUCATION,
        payload: data,
    };
}

export function actDeleteEntryLevelEducation(id) {
    return {
        type: DELETE_ENTRY_LEVEL_EDUCATION,
        payload: id,
    };
}

export const actGetEntryLevelEducationsAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await entryLevelEducationService.getEntryLevelEducations({ page, pageSize, search });
        dispatch(actGetEntryLevelEducations(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddEntryLevelEducationAsync = (data) => async (dispatch) => {
    try {
        const response = await entryLevelEducationService.addEntryLevelEducation(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddEntryLevelEducation(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateEntryLevelEducationAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await entryLevelEducationService.updateEntryLevelEducation({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateEntryLevelEducation(response.data));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteEntryLevelEducationAsync = (id) => async (dispatch) => {
    try {
        const response = await entryLevelEducationService.deleteEntryLevelEducation(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            dispatch(actDeleteEntryLevelEducation(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
};

export function resetEntryLevelEducationSuccess() {
    return {
        type: 'RESET_ENTRY_LEVEL_EDUCATION_SUCCESS',
    };
}
