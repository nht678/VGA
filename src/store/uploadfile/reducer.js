import { success } from 'src/theme/palette';
import { UPLOAD_FILE_SUCCESS } from './action';

const initialState = {
    loading: false,
    data: null,
    error: null,
    uploadSuccess: false,
};

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {

        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                loading: true,
                data: action.payload,
                uploadSuccess: true,
            };

        default:
            return state;
    }
};

export default uploadReducer;
