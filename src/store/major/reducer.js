import { ACT_ADD_MAJOR, ACT_DELETE_MAJOR, ACT_UPDATE_MAJOR, ACT_GET_MAJORS } from "./action";

const initialState = {
    majors: [],
    total: 0,
};

const majorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_GET_MAJORS:
            return {
                ...state,
                majors: action.payload.majors,
                total: action.payload.total,
            };
        case ACT_ADD_MAJOR:
            return {
                ...state,
                majors: [action.payload, ...state.majors],
            };
        case ACT_UPDATE_MAJOR:
            return {
                ...state,
                majors: state.majors.map((major) =>
                    major.id === action.payload.id ? action.payload : major
                ),
            };
        case ACT_DELETE_MAJOR:
            return {
                ...state,
                majors: state.majors.filter((major) => major.id !== action.payload),
            };

        default:
            return state;
    }
};

export default majorReducer;
