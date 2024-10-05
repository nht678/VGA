const initialState = {
    quizzes: [], // hoặc là một đối tượng khác tuỳ bạn
    success: false,
    error: null,
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_QUIZ_SUCCESS':
            return {
                ...state,
                quizzes: [...state.quizzes, action.payload],
                success: true, // Cập nhật success khi tạo thành công
            };
        case 'CREATE_QUIZ_FAILURE':
            return {
                ...state,
                error: action.payload, // Cập nhật lỗi nếu tạo thất bại
                success: false,
            };
        case 'RESET_QUIZ_STATUS': // Xử lý việc reset trạng thái
            return {
                ...state,
                success: false,
                error: null,
            };
        default:
            return state;
    }
};

export default quizReducer;
