import transactionService from "src/services/transactionService";

export const GET_TRANSACTION = "GET_TRANSACTION";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";

export const getTransaction = ({ page, pageSize, transactionType }) => async (dispatch) => {
    const response = await transactionService.getTransaction({ page, pageSize, transactionType });
    dispatch({
        type: GET_TRANSACTION,
        payload: response,
    });
}

