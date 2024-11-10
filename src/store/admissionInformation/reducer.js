

const initialState = {
    admissionInformation: [],
    total: 0,
}

export default function admissionInformationReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ADMISSION_INFORMATION':
            return {
                ...state,
                admissionInformation: action.payload._admissionInformationModel,
                total: action.payload.total,
            }
        case 'ADD_ADMISSION_INFORMATION':
            return {
                ...state,
                admissionInformation: [...state.admissionInformation, action.payload]
            }
        case 'UPDATE_ADMISSION_INFORMATION':
            return {
                ...state,
                admissionInformation: state.admissionInformation.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload
                    }
                    return item
                })
            }
        case 'DELETE_ADMISSION_INFORMATION':
            return {
                ...state,
                admissionInformation: state.admissionInformation.filter((item) => item.id !== action.payload)
            }
        default:
            return state
    }
}