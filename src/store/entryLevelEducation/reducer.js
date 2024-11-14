import { success } from 'src/theme/palette';
import { GET_ENTRY_LEVEL_EDUCATIONS, ADD_ENTRY_LEVEL_EDUCATION, UPDATE_ENTRY_LEVEL_EDUCATION, DELETE_ENTRY_LEVEL_EDUCATION } from './action';

const initialState = {
    entryLevelEducations: [],
    total: 0,
    success: false,
};

export default function entryLevelEducationReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ENTRY_LEVEL_EDUCATIONS:
            return {
                ...state,
                entryLevelEducations: action.payload.entryLevels,
                total: action.payload.total,
                success: true,
            };
        case ADD_ENTRY_LEVEL_EDUCATION:
            return {
                ...state,
                entryLevelEducations: [action.payload, ...state.entryLevelEducations],
                success: true,
            };
        case UPDATE_ENTRY_LEVEL_EDUCATION:
            return {
                ...state,
                entryLevelEducations: state.entryLevelEducations.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                }),
                success: true
            };
        case DELETE_ENTRY_LEVEL_EDUCATION:
            return {
                ...state,
                entryLevelEducations: state.entryLevelEducations.filter((item) => item.id !== action.payload),
                success: true,
            };
        case 'RESET_ENTRY_LEVEL_EDUCATION_SUCCESS':
            return {
                ...state,
                success: false,
            };
        default:
            return state;
    }
}