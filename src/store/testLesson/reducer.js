import { success } from 'src/theme/palette';
import { GET_TEST_LESSONS, CREATE_TEST_LESSON, UPDATE_TEST_LESSON, DELETE_TEST_LESSON, GET_TYPES_TEST_LESSON, UPLOAD_FILE_TEST, GET_QUESTION_BY_TEST_ID } from './action';

const initialState = {
    testLessons: [],
    success: false,
    total: 0,
    typestest: [],
    questions: [],
};

const testLessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TEST_LESSONS:
            return {
                ...state,
                testLessons: action.payload,
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
                questions: action.payload,
            };
        default:
            return state;
    }
};

export default testLessonReducer;