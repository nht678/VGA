
const initialState = {
    university: [],
    successUniversity: false,
    total: 0,

};

const reducerUniversity = (state = initialState, action) => {
    console.log('action', action);
    switch (action.type) {
        case 'ACT_UNIVERSITY_GET':
            return {
                ...state,
                universities: action.payload._universities,
                successUniversity: true,
                total: action.payload.total,

            };
        case 'ADD_UNIVERSITY':
            return {
                ...state,
                universities: [...state.universities, action.payload._universities],
                successUniversity: true,
            };
        case 'UPDATE_UNIVERSITY':
            return {
                ...state,
                universities: state.universities.map((university) => {
                    if (university.id === action.payload._universities.id) {
                        return action.payload._universities;
                    }
                    return university;
                }),
                successUniversity: true,
            };
        case 'DELETE_UNIVERSITY':
            return {
                ...state,
                universities: state.universities.filter((university) => university.id !== action.payload),
                successUniversity: true,
            };

        case 'RESET_UNIVERSITY_SUCCESS':
            return {
                ...state,
                successUniversity: false,
            };

        default:
            return state;
    }
}
export default reducerUniversity;