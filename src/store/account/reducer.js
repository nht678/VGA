

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
};
const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: null,
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