import { UPDATE_WALLET, GET_WALLET, GET_WALLETBYID } from "./action";

const initialState = {
    wallet: [],
    succesWallet: false,
};

export default function walletReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WALLET:
            return {
                ...state,
                wallet: action.payload,
            };
        case GET_WALLETBYID:
            return {
                ...state,
                wallet: action.payload,
            };
        case UPDATE_WALLET:
            return {
                ...state,
                wallet: action.payload,
            };
        default:
            return state;
    }
}