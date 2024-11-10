import { ACT_GET_OCCUPATION_GROUP, ACT_ADD_OCCUPATION_GROUP, ACT_UPDATE_OCCUPATION_GROUP, ACT_DELETE_OCCUPATION_GROUP } from "./action";

const initialState = {
    occupationGroups: [],
    total: 0,
};

export default function occupationGroupReducer(state = initialState, action) {
    switch (action.type) {
        case ACT_GET_OCCUPATION_GROUP:
            return {
                ...state,
                occupationGroups: action.payload.occupationalGroups,
                total: action.payload.total,
            };
        case ACT_ADD_OCCUPATION_GROUP:
            return {
                ...state,
                occupationGroups: [action.payload, ...state.occupationGroups],
            };
        case ACT_UPDATE_OCCUPATION_GROUP:
            return {
                ...state,
                occupationGroups: state.occupationGroups.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case ACT_DELETE_OCCUPATION_GROUP:
            return {
                ...state,
                occupationGroups: state.occupationGroups.filter((item) => item.id !== action.payload),
            };
        default:
            return state;
    }
}


