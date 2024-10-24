import { UPDATE_WALLET } from "./action";

const initialState = {
    wallet: [],
};

export default function walletReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_WALLET:
            return {
                ...state,
                wallet: action.payload,
            };
        default:
            return state;
    }
}