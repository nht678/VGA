
import uploadfileService from '../../services/uploadfileService';
// Action types

export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';

export const uploadFileSuccess = (data) => ({
    type: UPLOAD_FILE_SUCCESS,
    payload: data,
});

export function uploadFileAsync(data) {
    return async (dispatch) => {
        try {
            const response = await uploadfileService.uploadFile(data);
            dispatch(uploadFileSuccess(response));
        } catch (error) {
            console.log(error);
        }
    };
}
