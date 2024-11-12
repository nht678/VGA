import { success } from "src/theme/palette"


const initialState = {
    admissionInformation: [],
    total: 0,
    success: false,
}

export default function admissionInformationReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ADMISSION_INFORMATION':
            return {
                ...state,
                admissionInformation: action.payload._admissionInformationModel,
                total: action.payload.total,
                success: true
            }
        case 'ADD_ADMISSION_INFORMATION':
            return {
                ...state,
                admissionInformation: [...state.admissionInformation, action.payload],
                success: true
            }
        case 'UPDATE_ADMISSION_INFORMATION':
            return {
                ...state,
                admissionInformation: state.admissionInformation.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload
                    }
                    return item
                }),
                success: true
            }
        case 'DELETE_ADMISSION_INFORMATION':
            return {
                ...state,
                admissionInformation: state.admissionInformation.filter((item) => item.id !== action.payload),
                success: true
            }
        case 'RESET_ADMISSION_INFORMATION':
            return {
                ...state,
                success: false
            }

        default:
            return state
    }
}