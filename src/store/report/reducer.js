import { GET_REPORT, RESET } from './action';

const initialState = {
    reports: [],
    success: false,
    total: 0,
};

const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REPORT:
            return {
                ...state,
                reports: action.payload?.bookings,
                success: true,
                total: action.payload?.total,
            };
        case RESET:
            return {
                ...state,
                success: false,
            };
        default:
            return state;
    }
}


export default reportReducer;