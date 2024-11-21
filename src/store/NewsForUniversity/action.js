import { message } from 'antd';
import newsForUniversityService from "../../services/NewsForUniversityService";

export const GET_NEWS = 'GET_NEWS';
export const ADD_NEWS = 'ADD_NEWS';
export const UPDATE_NEWS = 'UPDATE_NEWS';
export const DELETE_NEWS = 'DELETE_NEWS';
export const DELETE_NEWS_IMAGE = 'DELETE_NEWS_IMAGE';
export const CREATE_NEWS_IMAGE = 'CREATE_NEWS_IMAGE';
export const UPDATE_NEWS_CONTENT = 'UPDATE_NEWS_CONTENT';
export const GET_NEWS_BY_ID = 'GET_NEWS_BY_ID';


export function actGetNews(data) {
    return {
        type: GET_NEWS,
        payload: data,
    };
}

export function actAddNews(data) {
    return {
        type: ADD_NEWS,
        payload: data,
    };
}

export function actUpdateNews(data) {
    return {
        type: UPDATE_NEWS,
        payload: data,
    };
}

export function actDeleteNews(id) {
    return {
        type: DELETE_NEWS,
        payload: id,
    };
}

export function actDeleteNewsImage(id) {
    return {
        type: DELETE_NEWS_IMAGE,
        payload: id,
    };
}

export function actCreateNewsImage(data) {
    return {
        type: CREATE_NEWS_IMAGE,
        payload: data,
    };
}

export function actUpdateNewsContent(data) {
    return {
        type: UPDATE_NEWS_CONTENT,
        payload: data,
    };
}
// get newsid 
export function actGetNewsById(data) {
    return {
        type: GET_NEWS_BY_ID,
        payload: data,
    };
}


export const actGetNewsAsync = ({ page, pageSize, search, universityid }) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.getNewsForUniversity({ page, pageSize, search, universityid });
        dispatch(actGetNews(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actGetNewsByIdAsync = (id) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.getNewsByIdForUniversity(id);
        dispatch(actGetNewsById(response.data));
    } catch (error) {
        console.error(error);
    }
};

export const actAddNewsAsync = (formData) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.addNewsForUniversity(formData);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddNews(response.data));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actUpdateNewsAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.updateNewsForUniversity({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateNews(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actUpdateNewsContentAsync = ({ formData, id }) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.updateNewsContentForUniversity({ id, formData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actUpdateNewsContent(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

// export const actUpdateNewsImageAsync = ({ formData, id }) => async (dispatch) => {
//     try {
//         const response = await newsForUniversityService.updateNewsImageForUniversity({ id, formData });
//         if (response.status === 200 || response.status === 201) {
//             message.success('Cập nhật thành công');
//             dispatch(actUpdateNews(response));
//         } else {
//             message.error('Cập nhật thất bại');
//         }
//     } catch (error) {
//         console.error(error);
//         message.error('Cập nhật thất bại');
//     }
// }

export const actCreateNewsImageAsync = ({ imageData, id }) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.createNewsImageForUniversity({ id, imageData });
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actCreateNewsImage(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
}

export const actDeleteNewsImageAsync = (id) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.deleteNewsImageForUniversity(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            dispatch(actDeleteNewsImage(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
}


export const actDeleteNewsAsync = (id) => async (dispatch) => {
    try {
        const response = await newsForUniversityService.deleteNewsForUniversity(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            // dispatch(actDeleteNews(id));  // Sử dụng action creator đã khai báo trước đó
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        // message.error('Xóa thất bại');
    }
};

export const resetNewsSuccess = () => async (dispatch) => {
    dispatch({ type: 'RESET_NEWS_SUCCESS' });
};

