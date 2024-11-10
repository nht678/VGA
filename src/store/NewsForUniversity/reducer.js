import { GET_NEWS, ADD_NEWS, UPDATE_NEWS, DELETE_NEWS } from './action';

const initialState = {
    news: [],
    total: 0,
};

const newsForUniversityReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS:
            return {
                ...state,
                news: action.payload._news,
                total: action.payload.total,
            };
        case ADD_NEWS:
            return {
                ...state,
                news: [action.payload, ...state.news],
            };
        case UPDATE_NEWS:
            return {
                ...state,
                news: state.news.map((news) =>
                    news.id === action.payload.id ? action.payload : news
                ),
            };
        case DELETE_NEWS:
            return {
                ...state,
                news: state.news.filter((news) => news.id !== action.payload),
            };
        default:
            return state;
    }
}

export default newsForUniversityReducer;
