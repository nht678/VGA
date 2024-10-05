

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
};
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNIN_USER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: null,
            };
        case 'SIGNIN_USER_FAIL':
            return {
                ...state,
                error: action.payload,
                isAuthenticated: false,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: null,
            };
        default:
            return state;
    }
};

export default accountReducer;