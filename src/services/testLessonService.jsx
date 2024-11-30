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
        const response = await BASE_API.put(`/personal-test/${id}`, data);
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
        const response = await BASE_API.post(`/personal-tests`, data);
        return response;
    },
    getQuestionByTestId: async ({ page, pageSize, id }) => {
        const params = {
            'current-page': page,
            'page-size': pageSize,
        };
        const response = await BASE_API.get(`/questions-by-test?personal-test-id=${id}`,
            {
                params
            }
        );
        return response;
    },
    updateQuestion: async ({ formData, id }) => {
        const response = await BASE_API.put(`/question/${id}`, formData);
        return response;
    },
    deleteQuestion: async (id) => {
        const response = await BASE_API.delete(`/question/${id}`);
        return response;
    },
    createQuestion: async (data) => {
        const response = await BASE_API.post(`/questions-for-personal-test`, data);
        return response;
    },

};

export default testLessonService;