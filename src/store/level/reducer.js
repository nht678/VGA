
const initialState = {
    consultantLevels: [],
    successLevel: false,
    error: null,
    total: 0,
};

const levelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACT_LEVEL_GET':
            return {
                ...state,
                consultantLevels: action.payload.consultantLevels,
                total: action.payload.total,
                successLevel: true,
            };
        case 'ADD_LEVEL':
            return {
                ...state,
                consultantLevels: [...state.consultantLevels, action.payload],
                successLevel: true,
            };
        case 'UPDATE_LEVEL':
            return {
                ...state,
                consultantLevels: state.consultantLevels.map((level) =>
                    level.id === action.payload.id ? action.payload : level,
                ),
                successLevel: true,
            };
        case 'DELETE_LEVEL':
            return {
                ...state,
                consultantLevels: state.consultantLevels.filter((level) => level.id !== action.payload),
                successLevel: true,
            };
        case 'RESET_LEVEL_SUCCESS':
            return {
                ...state,
                successLevel: false,
                error: null,
            };
        default:
            return state;
    }
}

export default levelReducer;