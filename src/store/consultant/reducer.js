

const initialState = {
    consultants: [],
    successConsultant: false,
    error: null,
};
const consultantReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CONSULTANTS_SUCCESS':
            return {
                ...state,
                consultants: action.payload.consultants,
                total: action.payload.total,
                currentPage: action.payload.currentPage,
                successConsultant: true,
            };
        case 'ADD_CONSULTANT':
            return {
                ...state,
                consultants: [...state.consultants, action.payload],
                successConsultant: true,
            };
        case 'UPDATE_CONSULTANT':
            return {
                ...state,
                consultants: state.consultants.map((consultant) =>
                    consultant.id === action.payload.id ? action.payload : consultant,
                ),
                successConsultant: true,
            };
        case 'DELETE_CONSULTANT':
            return {
                ...state,
                consultants: state.consultants.filter((consultant) => consultant.id !== action.payload),
                successConsultant: true,
            };
        case 'RESET_CONSULTANT_SUCCESS':
            return {
                ...state,
                successConsultant: false,
                error: null,
            };
        default:
            return state;
    }
}

export default consultantReducer;