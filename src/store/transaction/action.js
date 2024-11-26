import { message } from "antd";
import transactionService from "src/services/transactionService";

export const GET_TRANSACTION = "GET_TRANSACTION";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const DISTRIBUTION = "DISTRIBUTION";
export const CREATE_DISTRIBUTION = "CREATE_DISTRIBUTION";
export const REQUEST_WITHDRAWAL = "REQUEST_WITHDRAWAL";

export const getTransaction = ({ page, pageSize, transactionType, accountId, search }) => async (dispatch) => {
    const response = await transactionService.getTransaction({ page, pageSize, transactionType, accountId, search });
    dispatch({
        type: GET_TRANSACTION,
        payload: response,
    });
}

export const createDistribution = (data) => ({
    type: CREATE_DISTRIBUTION,
    payload: data,
});


export const createDistributionAsync = (data) => async (dispatch) => {
    debugger
    try {
        const response = await transactionService.createDistribution(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(createDistribution(response.data));
            message.success("Tạo phân phối thành công");
        } else {
            message.error("Tạo phân phối thất bại");
        }
    } catch (error) {
        console.error(error);
        message.error("Tạo phân phối thất bại");
    }
}

export const createDistributionofAdminUniAsync = ({ formData, gold }) => async (dispatch) => {
    try {
        const response = await transactionService.createDistributionofAdminUniAsync({ formData, gold });
        if (response.status === 200 || response.status === 201) {
            dispatch(createDistribution(response.data));
            message.success("Tạo phân phối thành công");
        } else {
            message.error("Tạo phân phối thất bại");
        }
    } catch (error) {
        console.error(error);
        message.error("Tạo phân phối thất bại");
    }
}

export const requestWithdrawal = (data) => ({
    type: REQUEST_WITHDRAWAL,
    payload: data,
});

export const requestWithdrawalAsync = (id, data) => async (dispatch) => {
    try {
        const response = await transactionService.requestWithdrawal(id, data);
        if (response.status === 200 || response.status === 201) {
            dispatch(requestWithdrawal(response.data));
            message.success("Xử lý thành công");
        } else {
            message.error("Xử lý thất bại");
        }
    } catch (error) {
        console.error(error);
        message.error("Xử lý thất bại");
    }
}



export const resetTransaction = () => ({
    type: "RESET_TRANSACTION",
});


