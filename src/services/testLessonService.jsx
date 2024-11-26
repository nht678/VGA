import { BASE_API } from "./api";

const testLessonService = {
    getTestLessons: async () => {
        const response = await BASE_API.get(`/personal-tests`);
        return response;
    },
    getTestLesson: async (id) => {
        const response = await BASE_API.get(`/personal-tests/${id}`);
        return response;
    },
    // createTestLesson: async (data) => {
    //     const response = await BASE_API.post(`/personal-tests`, data);
    //     return response;
    // },
    updateTestLesson: async (id, data) => {
        const response = await BASE_API.put(`/personal-tests/${id}`, data);
        return response;
    },
    deleteTestLesson: async (id) => {
        const response = await BASE_API.delete(`/personal-test/${id}`);
        return response;
    },
    getTypesTestLesson: async () => {
        const response = await BASE_API.get(`/test-types`);
        return response;
    },
    uploadFileTest: async (data) => {
        const response = await BASE_API.post(`/personal-test`, data);
        return response;
    },
    getQuestionByTestId: async (id) => {
        const response = await BASE_API.get(`/questions-by-test/${id}/`);
        return response;
    },

};

export default testLessonService;