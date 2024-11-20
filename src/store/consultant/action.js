import { message } from "antd";
import consultantService from "../../services/consultantService";

export const GET_CONSULTANTS_SUCCESS = "GET_CONSULTANTS_SUCCESS";
export const ADD_CONSULTANT = "ADD_CONSULTANT";
export const UPDATE_CONSULTANT = "UPDATE_CONSULTANT";
export const DELETE_CONSULTANT = "DELETE_CONSULTANT";
export const RESET_CONSULTANT_SUCCESS = "RESET_CONSULTANT_SUCCESS";

export const getConsultants = ({ page, pageSize, search, level }) => async (dispatch) => {
    try {
        const response = await consultantService.getConsultants({ page, pageSize, search, level });
        dispatch({
            type: GET_CONSULTANTS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.log(error);
    }
}

export const addConsultant = (data) => async (dispatch) => {
    try {
        const response = await consultantService.addConsultant(data);
        if (response.status === 201 || response.status === 200) {
            dispatch({
                type: ADD_CONSULTANT,
                payload: response.data,
            });
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.log(error);
        message.error('Thêm mới thất bại');
    }
}

export const updateConsultant = (id, data) => async (dispatch) => {
    try {
        const response = await consultantService.updateConsultant(id, data);
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch({
                type: UPDATE_CONSULTANT,
                payload: response.data,
            });
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.log(error);
        message.error('Cập nhật thất bại');
    }
}

export const deleteConsultant = (id) => async (dispatch) => {
    try {
        const response = await consultantService.deleteConsultant(id);
        if (response.status === 200) {
            message.success('Xóa thành công');
            dispatch({
                type: DELETE_CONSULTANT,
                payload: id,
            });
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.log(error);
        message.error('Xóa thất bại');
    }
}

export const resetConsultantSuccess = () => ({
    type: RESET_CONSULTANT_SUCCESS,
});

