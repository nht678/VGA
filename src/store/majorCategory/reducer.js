import { success } from 'src/theme/palette';
import { GET_MAJOR_CATEGORIES, ADD_MAJOR_CATEGORY, UPDATE_MAJOR_CATEGORY, DELETE_MAJOR_CATEGORY } from './action';

const initialState = {
    majorCategories: [],
    total: 0,
    success: false,
};

export default function majorCategoryReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MAJOR_CATEGORIES:
            return {
                ...state,
                majorCategories: action.payload.majorCategorys,
                total: action.payload.total,
                success: true
            };
        case ADD_MAJOR_CATEGORY:
            return {
                ...state,
                majorCategories: [action.payload, ...state.majorCategories],
                success: true
            };
        case UPDATE_MAJOR_CATEGORY:
            return {
                ...state,
                majorCategories: state.majorCategories.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                }),
                success: true
            };
        case DELETE_MAJOR_CATEGORY:
            return {
                ...state,
                majorCategories: state.majorCategories.filter((item) => item.id !== action.payload),
                success: true
            };
        case 'RESET_MAJOR_CATEGORY':
            return {
                ...state,
                success: false
            };
        default:
            return state;
    }
}

