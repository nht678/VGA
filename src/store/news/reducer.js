

const newsReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_NEWS':
            return state.map((news) =>
                news.id === action.payload.id ? { ...news, ...action.payload } : news
            );
        case 'DELETE_NEWS':
            return state.filter((news) => news.id !== action.payload);
        default:
            return state;
    }
};

export default newsReducer;