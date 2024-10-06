import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';
import newsReducer from './news/reducer';
import quizReducer from './eventquiz/reducer';
import accountReducer from './account/reducer';
import uploadReducer from './uploadfile/reducer';


const store = configureStore({
    reducer: {
        // counterReducer,
        usersReducer,
        newsReducer,
        quizReducer,
        accountReducer,
        uploadReducer
    }
});

export default store;
