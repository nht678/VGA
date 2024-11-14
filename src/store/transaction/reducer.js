
import { success } from 'src/theme/palette';
import { GET_TRANSACTION, DISTRIBUTION, CREATE_DISTRIBUTION } from './action';

const initialState = {
    transactions: [],
    total: 0,
    success: false,
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRANSACTION:
            return {
                ...state,
                transactions: action.payload.transactions,
                total: action.payload.total,
                success: true
            };
        case DISTRIBUTION:
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
                success: true,
            };
        // case CREATE_DISTRIBUTION:
        //     return {
        //         ...state,
        //         success: true,
        //     };
        case 'RESET_TRANSACTION':
            return {
                ...state,
                success: false,
            };

        default:
            return state;
    }
}

export default transactionReducer;