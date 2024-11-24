import { message } from 'antd';

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
            if (response) {
                dispatch(uploadFileSuccess(response));
                message.success('Thêm mới thành công');
            } else {
                message.error('Thêm mới thất bại');
            }
        } catch (error) {
            console.log(error);
            message.error('Thêm mới thất bại');
        }
    };
}

// reset 
export function resetUploadFile() {
    return {
        type: 'RESET_UPLOAD_FILE',
    };
}
