import { message } from "antd";
import transactionService from "src/services/transactionService";

export const GET_TRANSACTION = "GET_TRANSACTION";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const DISTRIBUTION = "DISTRIBUTION";
export const CREATE_DISTRIBUTION = "CREATE_DISTRIBUTION";

export const getTransaction = ({ page, pageSize, transactionType, accountId }) => async (dispatch) => {
    const response = await transactionService.getTransaction({ page, pageSize, transactionType, accountId });
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
    try {
        debugger
        const response = await transactionService.createDistribution(data);
        dispatch(createDistribution(response));
        message.success("Tạo phân phối thành công");
    } catch (error) {
        console.error(error);
        message.error("Tạo phân phối thất bại");
    }
}

export const resetTransaction = () => ({
    type: "RESET_TRANSACTION",
});


