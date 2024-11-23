import { GET_NEWS, ADD_NEWS, UPDATE_NEWS, DELETE_NEWS, UPDATE_NEWS_CONTENT, GET_NEWS_BY_ID } from './action';

const initialState = {
    news: [],
    total: 0,
    success: false,
    newsById: null, // Chứa thông tin bài báo cụ thể
};

const newsForUniversityReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS:
            return {
                ...state,
                news: action.payload._news,
                total: action.payload.total,
                success: true,
            };
        case GET_NEWS_BY_ID:
            return {
                ...state,
                newsById: action.payload,
                success: true,
            };
        case ADD_NEWS:
            return {
                ...state,
                news: [action.payload, ...state.news],
                success: true,
            };
        case UPDATE_NEWS:
            return {
                ...state,
                news: state?.news.map((news) =>
                    news.id === action.payload.id ? action.payload : news
                ),
                success: true,
            };
        case DELETE_NEWS:
            return {
                ...state,
                news: state?.news?.filter((news) => news?.id !== action?.payload),
                success: true,
            };

        case UPDATE_NEWS_CONTENT:
            return {
                ...state,
                news: state?.news.map((news) =>
                    news.id === action.payload.id ? action.payload : news
                ),
                success: true,
            };
        case 'RESET_NEWS_SUCCESS':
            return {
                ...state,
                success: false,
            };
        default:
            return state;
    }
}

export default newsForUniversityReducer;
