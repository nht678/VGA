import { GET_ADMISSION_METHODS, ADD_ADMISSION_METHOD, UPDATE_ADMISSION_METHOD, DELETE_ADMISSION_METHOD } from './action';

const initialState = {
    admissionMethods: [],
    total: 0,
};

export default function admissionMethodReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ADMISSION_METHODS:
            return {
                ...state,
                admissionMethods: action.payload._admissionMethodModels,
                total: action.payload.total,
            };
        case ADD_ADMISSION_METHOD:
            return {
                ...state,
                admissionMethods: [action.payload, ...state.admissionMethods],
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
            };
        case DELETE_ADMISSION_METHOD:
            return {
                ...state,
                admissionMethods: state.admissionMethods.filter((item) => item.id !== action.payload),
            };
        default:
            return state;
    }
}