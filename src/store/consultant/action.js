import consultantService from "../../services/consultantService";

export const GET_CONSULTANTS_SUCCESS = "GET_CONSULTANTS_SUCCESS";
export const ADD_CONSULTANT = "ADD_CONSULTANT";
export const UPDATE_CONSULTANT = "UPDATE_CONSULTANT";
export const DELETE_CONSULTANT = "DELETE_CONSULTANT";
export const RESET_CONSULTANT_SUCCESS = "RESET_CONSULTANT_SUCCESS";

export const getConsultants = (page, pageSize) => async (dispatch) => {
    try {
        const data = await consultantService.getConsultants(page, pageSize);
        dispatch({
            type: GET_CONSULTANTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
}

export const addConsultant = (data) => async (dispatch) => {
    try {
        const response = await consultantService.addConsultant(data);
        dispatch({
            type: ADD_CONSULTANT,
            payload: response,
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateConsultant = (id, data) => async (dispatch) => {
    try {
        const response = await consultantService.updateConsultant(id, data);
        dispatch({
            type: UPDATE_CONSULTANT,
            payload: response,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteConsultant = (id) => async (dispatch) => {
    try {
        const response = await consultantService.deleteConsultant(id);
        dispatch({
            type: DELETE_CONSULTANT,
            payload: id,
        });
    } catch (error) {
        console.log(error);
    }
}

export const resetConsultantSuccess = () => ({
    type: RESET_CONSULTANT_SUCCESS,
});

