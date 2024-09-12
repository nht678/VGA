import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './test/reducer';
import usersReducer from './users/reducer';

const store = configureStore({
    reducer: {
        // counterReducer,
        usersReducer
    }
});

export default store;
