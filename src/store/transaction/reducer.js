
import { GET_TRANSACTION } from './action';

const initialState = {
    transactions: [],
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSACTION:
            return {
                ...state,
                transactions: action.payload.transactions,
            };


        default:
            return state;
    }
}

export default transactionReducer;