import { message } from "antd";
import testLessonService from "../../services/testLessonService";

export const GET_TEST_LESSONS = "GET_TEST_LESSONS";
export const CREATE_TEST_LESSON = "CREATE_TEST_LESSON";
export const UPDATE_TEST_LESSON = "UPDATE_TEST_LESSON";
export const DELETE_TEST_LESSON = "DELETE_TEST_LESSON";
export const GET_TYPES_TEST_LESSON = "GET_TYPES_TEST_LESSON";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_SUCCESS_QUESTION = "RESET_SUCCESS_QUESTION";
export const UPLOAD_FILE_TEST = "UPLOAD_FILE_TEST";
export const GET_QUESTION_BY_TEST_ID = "GET_QUESTION_BY_TEST_ID";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const CREATE_QUESTION = "CREATE_QUESTION";

export function actGetTestLessons(data) {
    return {
        type: GET_TEST_LESSONS,
        payload: data,
    };
}

export function actCreateTestLesson(data) {
    return {
        type: CREATE_TEST_LESSON,
        payload: data,
    };
}

export function actUpdateTestLesson(data) {
    return {
        type: UPDATE_TEST_LESSON,
        payload: data,
    };
}

export function actDeleteTestLesson(id) {
    return {
        type: DELETE_TEST_LESSON,
        payload: id,
    };
}

export function actResetSuccess() {
    return {
        type: "RESET_SUCCESS",
    };
}

export function actResetSuccessQuestion() {
    return {
        type: "RESET_SUCCESS_QUESTION",
    };
}

export function actUploadFileTest(data) {
    return {
        type: UPLOAD_FILE_TEST,
        payload: data,
    };
}

export function actGetquestionbyTestId(data) {
    return {
        type: GET_QUESTION_BY_TEST_ID,
        payload: data,
    };
}


export function actGetTypesTestLesson(data) {
    return {
        type: GET_TYPES_TEST_LESSON,
        payload: data,
    };
}

export function actUpdateQuestion(data) {
    return {
        type: UPDATE_QUESTION,
        payload: data,
    };
}

export function actDeleteQuestion(id) {
    return {
        type: DELETE_QUESTION,
        payload: id,
    };
}

export function actCreateQuestion(data) {
    return {
        type: CREATE_QUESTION,
        payload: data,
    };
}


export const actGetTestLessonsAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await testLessonService.getTestLessons({ page, pageSize, search });
        dispatch(actGetTestLessons(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actCreateTestLessonAsync = (data) => async (dispatch) => {
    try {
        const response = await testLessonService.createTestLesson(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actCreateTestLesson(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
    }
}

export const actUpdateTestLessonAsync = (id, data) => async (dispatch) => {
    try {
        const response = await testLessonService.updateTestLesson(id, data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actUpdateTestLesson(response));
            message.success('Cập nhật thành công');
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
    }
}

export const actDeleteTestLessonAsync = (id) => async (dispatch) => {
    try {
        const response = await testLessonService.deleteTestLesson(id);
        if (response.status === 200 || response.status === 201) {
            dispatch(actDeleteTestLesson(id));
            message.success('Xóa thành công');
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
    }
}

export const actGetTypesTestLessonAsync = () => async (dispatch) => {
    try {
        const response = await testLessonService.getTypesTestLesson();
        dispatch(actGetTypesTestLesson(response.data));
    } catch (error) {
        console.error(error);
    }
}

export const actUploadFileTestAsync = (data) => async (dispatch) => {
    try {
        const response = await testLessonService.uploadFileTest(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actUploadFileTest(response.data));
            message.success('Upload thành công');
        } else {
            message.error('Upload thất bại');
        }
    } catch (error) {
        console.error(error);
    }
}

export const actGetquestionbyTestIdAsync = ({ page, pageSize, id, search }) => async (dispatch) => {
    try {
        const response = await testLessonService.getQuestionByTestId({ page, pageSize, id, search });
        dispatch(actGetquestionbyTestId(response.data));
    } catch (error) {
        console.error(error);
    }
}

export const actUpdateQuestionAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await testLessonService.updateQuestion({ formData, id });
        if (response.status === 200 || response.status === 201) {
            dispatch(actUpdateQuestion(response));
            message.success('Cập nhật thành công');
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
}

export const actDeleteQuestionAsync = (id) => async (dispatch) => {
    try {
        const response = await testLessonService.deleteQuestion(id);
        if (response.status === 200 || response.status === 201) {
            dispatch(actDeleteQuestion(id));
            message.success('Xóa thành công');
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
    }
}

export const actCreateQuestionAsync = (data) => async (dispatch) => {
    try {
        const response = await testLessonService.createQuestion(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actCreateQuestion(response.data));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
}


