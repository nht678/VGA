import { GET_WORK_SKILLS, ADD_WORK_SKILL, UPDATE_WORK_SKILL, DELETE_WORK_SKILL } from "./action";

const initialState = {
    workSkills: [],
    total: 0,
};

export default function workSkillReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WORK_SKILLS:
            return {
                ...state,
                workSkills: action.payload.workSkills,
                total: action.payload.total,
            };
        case ADD_WORK_SKILL:
            return {
                ...state,
                workSkills: [action.payload, ...state.workSkills],
            };
        case UPDATE_WORK_SKILL:
            return {
                ...state,
                workSkills: state.workSkills.map((workSkill) =>
                    workSkill.id === action.payload.id ? action.payload : workSkill
                ),
            };
        case DELETE_WORK_SKILL:
            return {
                ...state,
                workSkills: state.workSkills.filter((workSkill) => workSkill.id !== action.payload),
            };

        default:
            return state;
    }
}
