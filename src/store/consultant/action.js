import consultantService from "../../services/consultantService";

export const FETCH_CONSULTANTS_REQUEST = "FETCH_CONSULTANTS_REQUEST";

export function fetchConsultants(page, pageSize) {
    return async (dispatch) => {
        try {
            dispatch({ type: FETCH_CONSULTANTS_REQUEST });
            const response = await consultantService.getConsultants(page, pageSize);
            console.log('response:', response);
            dispatch({ type: 'GET_CONSULTANTS_SUCCESS', payload: response });
        } catch (error) {
            console.log('Error:', error); // In lỗi để kiểm tra
        }
    };
}
