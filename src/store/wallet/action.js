import { message } from "antd";
import walletService from "../../services/wallet";

export const UPDATE_WALLET = "UPDATE_WALLET";
export const GET_WALLET = "GET_WALLET";
export const GET_WALLETBYID = "GET_WALLETBYID";


export const updateWallet = (data) => ({
    type: UPDATE_WALLET,
    payload: data,
});

export const getWallet = (data) => ({
    type: GET_WALLET,
    payload: data,
});

export const getWalletbyId = (data) => ({
    type: GET_WALLETBYID,
    payload: data,
});


export function getWalletAsync({ page, pageSize }) {
    return async (dispatch) => {
        try {
            const response = await walletService.getWallet({ page, pageSize });
            if (response.status === 200) {
                dispatch(getWallet(response.data));
            }
        } catch (error) {
            console.log(error);
            message.error("Lấy thông tin ví thất bại");
        }
    };
}
export function getWalletbyIdAsync({ id }) {
    return async (dispatch) => {
        try {
            const response = await walletService.getWalletbyId({ id });
            if (response.status === 200) {
                dispatch(getWalletbyId(response.data));
            } else {
                message.error("Lấy thông tin ví thất bại");
            }
        } catch (error) {
            console.log(error);
            message.error("Lấy thông tin ví thất bại");
        }
    };
}


export function updateWalletAsync({ id, data }) {
    return async (dispatch) => {
        try {
            const response = await walletService.updateWallet({ id, data });
            if (response.status === 200) {
                message.success("Cập nhật ví thành công");
            } else {
                message.error("Cập nhật ví thất bại");
            }
        } catch (error) {
            console.log(error);
            message.error("Cập nhật ví thất bại");
        }
    };
}




