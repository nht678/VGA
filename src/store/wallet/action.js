import walletService from "../../services/wallet";

export const UPDATE_WALLET = "UPDATE_WALLET";

export const updateWallet = (data) => ({
    type: UPDATE_WALLET,
    payload: data,
});

export function updateWalletAsync({ id, data }) {
    return async (dispatch) => {
        try {
            const response = await walletService.updateWallet({ id, data });
            dispatch(updateWallet(response));
        } catch (error) {
            console.log(error);
        }
    };
}


