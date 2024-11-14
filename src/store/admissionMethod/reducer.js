import { success } from 'src/theme/palette';
import { GET_ADMISSION_METHODS, ADD_ADMISSION_METHOD, UPDATE_ADMISSION_METHOD, DELETE_ADMISSION_METHOD } from './action';

const initialState = {
    admissionMethods: [],
    total: 0,
    success: false,
};

export default function admissionMethodReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ADMISSION_METHODS:
            return {
                ...state,
                admissionMethods: action.payload._admissionMethodModels,
                total: action.payload.total,
                success: true,
            };
        case ADD_ADMISSION_METHOD:
            return {
                ...state,
                admissionMethods: [action.payload, ...state.admissionMethods],
                success: true,
            };
        case UPDATE_ADMISSION_METHOD:
            return {
                ...state,
                admissionMethods: state.admissionMethods.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                }),
                success: true,
            };
        case DELETE_ADMISSION_METHOD:
            return {
                ...state,
                admissionMethods: state.admissionMethods.filter((item) => item.id !== action.payload),
                success: true,
            };
        case 'RESET_ADMISSION_METHOD':
            return {
                ...state,
                success: false,
            };
        default:
            return state;
    }
}