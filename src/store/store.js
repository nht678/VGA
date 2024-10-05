import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './test/reducer';
import usersReducer from './users/reducer';
import newsReducer from './news/reducer';
import quizReducer from './eventquiz/reducer';
import accountReducer from './account/reducer';

const store = configureStore({
    reducer: {
        // counterReducer,
        usersReducer,
        newsReducer,
        quizReducer,
        accountReducer,
    }
});

export default store;
