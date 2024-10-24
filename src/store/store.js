import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/reducer';
import newsReducer from './news/reducer';
import quizReducer from './eventquiz/reducer';
import accountReducer from './account/reducer';
import uploadReducer from './uploadfile/reducer';
import highschoolReducer from './highschool/reducer';
import regionReducer from './region/reducer';
import consultantReducer from './consultant/reducer';
import reducerUniversity from './university/reducer';
import levelReducer from './level/reducer';
import transactionReducer from './transaction/reducer';
import walletReducer from './wallet/reducer';


const store = configureStore({
    reducer: {
        // counterReducer,
        usersReducer,
        newsReducer,
        quizReducer,
        accountReducer,
        uploadReducer,
        highschoolReducer,
        regionReducer,
        consultantReducer,
        reducerUniversity,
        levelReducer,
        transactionReducer,
        walletReducer
    }
});

export default store;
