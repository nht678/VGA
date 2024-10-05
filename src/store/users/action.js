import { apiUser } from "src/services/userServices";
import axios from "axios";
import { combineReducers } from "@reduxjs/toolkit";

export const ACT_USER_GET = 'ACT_USER_GET';
export const ADD_USER = 'ADD_USER';

export function actUserGet(data) {
    return {
        type: ACT_USER_GET,
        payload: data,
    };
}

export function actAddUser(data) {
    return {
        type: ADD_USER,
        payload: data,
    };
}
export function actUserUpdate(data) {
    return {
        type: 'UPDATE_USER',
        payload: data,
    };
}
export function actUserDelete(id) {
    return {
        type: 'REMOVE_USER',
        payload: id,
    };
}


// export function actUserGetAsync() {
//     return async (dispatch) => {
//         try {
//             const response = await apiUser.get('/users');
//             dispatch(actUserGet(response.data));
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }
export const actUserGetAsync = ({ page, pageSize }) => async (dispatch) => {
    try {
        console.log('Fetching data for page:', page, 'and pageSize:', pageSize);
        const response = await apiUser.get('', {
            params: {
                'current-page': page,
                'page-size': pageSize,
            },
        });
        console.log('Response data:', response.data);

        dispatch({
            type: 'GET_USERS_SUCCESS',
            payload: {
                students: response.data.students, // Lấy danh sách sinh viên
                total: response.data.total,       // Lấy tổng số sinh viên
                currentPage: response.data['current-page'], // Lấy trang hiện tại
            },
        });
    } catch (error) {
        dispatch({
            type: 'GET_USERS_ERROR',
            payload: error,
        });
    }
};


export function actAddUserAsync(data) {
    console.log('data:', data);
    return async (dispatch) => {
        try {
            const response = await apiUser.post('', data);
            console.log('response:', response);
            dispatch(actAddUser(response.data));
        } catch (error) {
            console.log(error);
        }
    };
}
export function actUserUpdateAsync(data, id) {
    return async (dispatch) => {
        try {
            console.log("data", data, id);
            const response = await apiUser.put(`/users/${id}`, data);
            dispatch(actUserUpdate(response.data));
        } catch (error) {
            console.log(error);
        }
    };
}
export function actUserDeleteAsync(id) {
    return async (dispatch) => {
        try {
            const response = await apiUser.delete(`/users/${id}`);
            dispatch(actUserDelete(id));
        } catch (error) {
            console.log(error);
        }
    };
}