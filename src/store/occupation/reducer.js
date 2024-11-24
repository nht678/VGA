import { ACT_GET_OCCUPATIONS, ACT_ADD_OCCUPATION, ACT_UPDATE_OCCUPATION, ACT_DELETE_OCCUPATION } from "./action";

const initialState = {
    occupations: [],
    total: 0,
    successOccupation: false,
};

const occupationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_OCCUPATIONS:
            return {
                ...state,
                occupations: action.payload.occupations,
                total: action.payload.total,
                successOccupation: true,
            };
        case ACT_ADD_OCCUPATION:
            return {
                ...state,
                occupations: [action.payload, ...state.occupations],
                successOccupation: true,
            };
        case ACT_UPDATE_OCCUPATION:
            return {
                ...state,
                occupations: state.occupations.map((occupation) =>
                    occupation.id === action.payload.id ? action.payload : occupation
                ),
                successOccupation: true,
            };
        case ACT_DELETE_OCCUPATION:
            return {
                ...state,
                occupations: state.occupations.filter((occupation) => occupation.id !== action.payload),
                successOccupation: true,
            };
        case 'RESET_OCCUPATION':
            return {
                ...state,
                successOccupation: false,
            };

        default:
            return state;
    }
};

export default occupationReducer;