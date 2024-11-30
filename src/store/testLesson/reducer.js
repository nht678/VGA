import { success } from 'src/theme/palette';
import { GET_TEST_LESSONS, CREATE_TEST_LESSON, UPDATE_TEST_LESSON, DELETE_TEST_LESSON, GET_TYPES_TEST_LESSON, UPLOAD_FILE_TEST, GET_QUESTION_BY_TEST_ID, CREATE_QUESTION, DELETE_QUESTION, UPDATE_QUESTION } from './action';

const initialState = {
    testLessons: [],
    success: false,
    total: 0,
    typestest: [],
    questions: [],
    totalQuestion: 0,
    successQuestion: false,
};

const testLessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TEST_LESSONS:
            return {
                ...state,
                testLessons: action.payload?.questions,
                total: action.payload?.total,
            };
        case CREATE_TEST_LESSON:
            return {
                ...state,
                success: true,
            };
        case UPDATE_TEST_LESSON:
            return {
                ...state,
                success: true,
                testLessons: state.testLessons.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                }),
            };
        case DELETE_TEST_LESSON:
            return {
                ...state,
                success: true,
            };
        case "RESET_SUCCESS":
            return {
                ...state,
                success: false,
            };
        case GET_TYPES_TEST_LESSON:
            return {
                ...state,
                typestest: action.payload,
            };
        case UPLOAD_FILE_TEST:
            return {
                ...state,
                success: true,
            };
        case GET_QUESTION_BY_TEST_ID:
            return {
                ...state,
                questions: action.payload?.questions,
                totalQuestion: action.payload.total,
                successQuestion: true,
            };
        case CREATE_QUESTION:
            return {
                ...state,
                successQuestion: true,
                questions: [...state.questions, action.payload],
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter((item) => item.id !== action.payload),
                successQuestion: true,
            };
        case UPDATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                }),
                successQuestion: true,
            };

        case 'RESET_SUCCESS_QUESTION':
            return {
                ...state,
                successQuestion: false,
            };
        default:
            return state;
    }
};

export default testLessonReducer;