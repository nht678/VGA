import admissionmethodService from "src/services/admissionmethodService";
import { message } from "antd";

export const GET_ADMISSION_METHODS = "GET_ADMISSION_METHODS";
export const ADD_ADMISSION_METHOD = "ADD_ADMISSION_METHOD";
export const UPDATE_ADMISSION_METHOD = "UPDATE_ADMISSION_METHOD";
export const DELETE_ADMISSION_METHOD = "DELETE_ADMISSION_METHOD";

export function actGetAdmissionMethods(data) {
    return {
        type: GET_ADMISSION_METHODS,
        payload: data,
    };
}

export function actAddAdmissionMethod(data) {
    return {
        type: ADD_ADMISSION_METHOD,
        payload: data,
    };
}

export function actUpdateAdmissionMethod(data) {
    return {
        type: UPDATE_ADMISSION_METHOD,
        payload: data,
    };
}

export function actDeleteAdmissionMethod(id) {
    return {
        type: DELETE_ADMISSION_METHOD,
        payload: id,
    };
}

export const actGetAdmissionMethodsAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await admissionmethodService.getAdmissionMethods({ page, pageSize, search });
        dispatch(actGetAdmissionMethods(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddAdmissionMethodAsync = (data) => async (dispatch) => {
    try {
        const response = await admissionmethodService.addAdmissionMethod(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddAdmissionMethod(response.data));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateAdmissionMethodAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await admissionmethodService.updateAdmissionMethod({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateAdmissionMethod(response.data));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteAdmissionMethodAsync = (id) => async (dispatch) => {
    try {
        const response = await admissionmethodService.deleteAdmissionMethod(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            dispatch(actDeleteAdmissionMethod(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
};

export function resetAdmissionMethod() {
    return {
        type: 'RESET_ADMISSION_METHOD',
    }
}


