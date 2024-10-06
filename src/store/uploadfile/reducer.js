import { success } from 'src/theme/palette';
import { UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAILURE } from './action';

const initialState = {
    loading: false,
    data: null,
    error: null,
    uploadSuccess: false,
};

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_FILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                loading: true,
                data: action.payload,
                uploadSuccess: true,
            };
        case UPLOAD_FILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                uploadSuccess: false,
            };
        default:
            return state;
    }
};

export default uploadReducer;
