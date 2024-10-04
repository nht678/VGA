import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './test/reducer';
import usersReducer from './users/reducer';
import newsReducer from './news/reducer';

const store = configureStore({
    reducer: {
        // counterReducer,
        usersReducer,
        newsReducer
    }
});

export default store;
