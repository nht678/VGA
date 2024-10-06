
import { apiuploadFile } from 'src/services/userServices';
// Action types
export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

// Action creators
export const uploadFileRequest = () => ({
    type: UPLOAD_FILE_REQUEST,
});

export const uploadFileSuccess = (data) => ({
    type: UPLOAD_FILE_SUCCESS,
    payload: data,
});

export const uploadFileFailure = (error) => ({
    type: UPLOAD_FILE_FAILURE,
    payload: error,
});


export const uploadFile = (payload) => async (dispatch) => {
    dispatch(uploadFileRequest());
    try {
        const response = await apiuploadFile.post('', payload);
        console.log('uploadFile', response);
        dispatch(uploadFileSuccess(response.data));
    } catch (error) {
        dispatch(uploadFileFailure(error.message));
    }
};