import { message } from "antd";
import occupationService from "src/services/occupationService";

export const ACT_GET_OCCUPATIONS = "ACT_GET_OCCUPATIONS";
export const ACT_ADD_OCCUPATION = "ACT_ADD_OCCUPATION";
export const ACT_UPDATE_OCCUPATION = "ACT_UPDATE_OCCUPATION";
export const ACT_DELETE_OCCUPATION = "ACT_DELETE_OCCUPATION";

export function actGetOccupations(data) {
    return {
        type: ACT_GET_OCCUPATIONS,
        payload: data,
    };
}

export function actAddOccupation(data) {
    return {
        type: ACT_ADD_OCCUPATION,
        payload: data,
    };
}

export function actUpdateOccupation(data) {
    return {
        type: ACT_UPDATE_OCCUPATION,
        payload: data,
    };
}

export function actDeleteOccupation(id) {
    return {
        type: ACT_DELETE_OCCUPATION,
        payload: id,
    };
}

export const actGetOccupationsAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await occupationService.getOccupations({ page, pageSize, search });
        dispatch(actGetOccupations(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddOccupationAsync = (data) => async (dispatch) => {
    try {
        const response = await occupationService.addOccupation(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddOccupation(response.data));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateOccupationAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await occupationService.updateOccupation({ formData, id });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateOccupation(response.data));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actDeleteOccupationAsync = (id) => async (dispatch) => {
    try {
        const response = await occupationService.deleteOccupation(id);
        if (response.status === 200 || response.status === 201) {
            dispatch(actDeleteOccupation(id));
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
export function resetOccupation() {
    return {
        type: 'RESET_OCCUPATION',
    };
}

