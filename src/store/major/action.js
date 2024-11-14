import { message } from "antd";
import majorService from "../../services/majorService";

export const ACT_GET_MAJORS = "ACT_GET_MAJORS";
export const ACT_ADD_MAJOR = "ACT_ADD_MAJOR";
export const ACT_UPDATE_MAJOR = "ACT_UPDATE_MAJOR";
export const ACT_DELETE_MAJOR = "ACT_DELETE_MAJOR";

export function actGetMajors(data) {
    return {
        type: ACT_GET_MAJORS,
        payload: data,
    };
}

export function actAddMajor(data) {
    return {
        type: ACT_ADD_MAJOR,
        payload: data,
    };
}

export function actUpdateMajor(data) {
    return {
        type: ACT_UPDATE_MAJOR,
        payload: data,
    };
}

export function actDeleteMajor(id) {
    return {
        type: ACT_DELETE_MAJOR,
        payload: id,
    };
}

export const actGetMajorsAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await majorService.getMajors({ page, pageSize, search });
        dispatch(actGetMajors(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddMajorAsync = (data) => async (dispatch) => {
    try {
        const response = await majorService.addMajor(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddMajor(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateMajorAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await majorService.updateMajor({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateMajor(response.data));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteMajorAsync = (id) => async (dispatch) => {
    try {
        const response = await majorService.deleteMajor(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            dispatch(actDeleteMajor(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
};

export function resetMajor() {
    return {
        type: "RESET_MAJOR",
    };
}


