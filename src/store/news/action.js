import axios from 'axios';
import { baseAPI } from '../../services/api';


export const updateNews = (id, updatedData) => async (dispatch) => {
    try {
        // Gọi API với baseAPI để cập nhật thông tin news
        const response = await baseAPI.put(`/news/${id}`, updatedData);

        // Dispatch hành động để cập nhật state Redux
        dispatch({ type: 'UPDATE_NEWS', payload: response.data });
    } catch (error) {
        console.error('Error updating news:', error);
        // Bạn có thể dispatch một action khác nếu cần xử lý lỗi
        dispatch({ type: 'UPDATE_NEWS_ERROR', payload: error.message });
    }
};
export const deleteNews = (id) => async (dispatch) => {
    try {
        await axios.delete(`https://65dc58f6e7edadead7ebb035.mockapi.io/news/${id}`);
        dispatch({ type: 'DELETE_NEWS', payload: id });
    } catch (error) {
        console.error('Error deleting news:', error);
    }
};
export const createNews = (news) => async (dispatch) => {
    try {
        const response = await baseAPI.post('/news', news);
        dispatch({ type: 'CREATE_NEWS', payload: response.data });
    } catch (error) {
        console.error('Error creating news:', error);
    }
};
// Thêm hành động lấy danh sách news
export const getNews = () => async (dispatch) => {
    try {
        const response = await baseAPI.get('/news');
        dispatch({ type: 'GET_NEWS', payload: response.data });
    } catch (error) {
        console.error('Error getting news:', error);
    }
};
