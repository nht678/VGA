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
import admissionInformationReducer from './admissionInformation/reducer';
import majorReducer from './major/reducer';
import occupationReducer from './occupation/reducer';
import admissionMethodReducer from './admissionMethod/reducer';
import entryLevelEducationReducer from './entryLevelEducation/reducer';
import majorCategoryReducer from './majorCategory/reducer';
import occupationGroupReducer from './occupationGroup/reducer';
import workSkillReducer from './workSkill/reducer';
import newsForUniversityReducer from './NewsForUniversity/reducer';
import testLessonReducer from './testLesson/reducer';


const store = configureStore({
    reducer: {
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
        walletReducer,
        admissionInformationReducer,
        majorReducer,
        occupationReducer,
        admissionMethodReducer,
        entryLevelEducationReducer,
        majorCategoryReducer,
        occupationGroupReducer,
        workSkillReducer,
        newsForUniversityReducer,
        testLessonReducer,
    }
});

export default store;
