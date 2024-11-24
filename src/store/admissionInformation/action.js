import message from 'antd/lib/message';
import admissionInformationService from "../../services/admissionInformationService";

export function actGetAdmissionInformation(data) {
    return {
        type: "GET_ADMISSION_INFORMATION",
        payload: data,
    };
}

export function actAddAdmissionInformation(data) {
    return {
        type: "ADD_ADMISSION_INFORMATION",
        payload: data,
    };
}

export function actUpdateAdmissionInformation(data) {
    return {
        type: "UPDATE_ADMISSION_INFORMATION",
        payload: data,
    };
}

export function actDeleteAdmissionInformation(id) {
    return {
        type: "DELETE_ADMISSION_INFORMATION",
        payload: id,
    };
}

export const actGetAdmissionInformationAsync = ({ page, pageSize, search, universityid }) => async (dispatch) => {
    try {
        const response = await admissionInformationService.getAdmissionInformation({ page, pageSize, search, universityid });
        dispatch(actGetAdmissionInformation(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddAdmissionInformationAsync = ({ formData, universityId }) => async (dispatch) => {
    try {
        const response = await admissionInformationService.addAdmissionInformation({ formData, universityId });
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddAdmissionInformation(response.data));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateAdmissionInformationAsync = ({ formData }) => async (dispatch) => {
    try {
        const response = await admissionInformationService.updateAdmissionInformation({ formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateAdmissionInformation(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteAdmissionInformationAsync = (id) => async (dispatch) => {
    try {
        const response = await admissionInformationService.deleteAdmissionInformation(id);
        if (response.status === 200 || response.status === 201) {
            dispatch(actDeleteAdmissionInformation(id));
            message.success('Xóa thành công');
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
};

// reset

export function actResetAdmissionInformation() {
    return {
        type: "RESET_ADMISSION_INFORMATION",
    };
}

