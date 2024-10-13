
const initialState = {
    universities: [],
    successHighSchool: false,
};

const reducerUniversity = (state = initialState, action) => {
    switch (action.type) {
        case 'ACT_UNIVERSITY_GET':
            return {
                ...state,
                universities: action.payload,
                successHighSchool: true,

            };
        case 'ADD_UNIVERSITY':
            return {
                ...state,
                universities: [...state.universities, action.payload],
                successHighSchool: true,
            };
        case 'UPDATE_UNIVERSITY':
            return {
                ...state,
                universities: state.universities.map((university) => {
                    if (university.id === action.payload.id) {
                        return action.payload;
                    }
                    return university;
                }
                ),
                successHighSchool: true,
            };
        case 'DELETE_UNIVERSITY':
            return {
                ...state,
                universities: state.universities.filter((university) => university.id !== action.payload),
                successHighSchool: true,
            };
        case 'RESET_UNIVERSITY_SUCCESS':
            return {
                ...state,
                successHighSchool: false,
            };

        default:
            return state;
    }
}