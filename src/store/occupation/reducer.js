import { ACT_GET_OCCUPATIONS, ACT_ADD_OCCUPATION, ACT_UPDATE_OCCUPATION, ACT_DELETE_OCCUPATION } from "./action";

const initialState = {
    occupations: [],
    total: 0,
};

const occupationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_OCCUPATIONS:
            return {
                ...state,
                occupations: action.payload.occupations,
                total: action.payload.total,
            };
        case ACT_ADD_OCCUPATION:
            return {
                ...state,
                occupations: [action.payload, ...state.occupations],
            };
        case ACT_UPDATE_OCCUPATION:
            return {
                ...state,
                occupations: state.occupations.map((occupation) =>
                    occupation.id === action.payload.id ? action.payload : occupation
                ),
            };
        case ACT_DELETE_OCCUPATION:
            return {
                ...state,
                occupations: state.occupations.filter((occupation) => occupation.id !== action.payload),
            };

        default:
            return state;
    }
};

export default occupationReducer;