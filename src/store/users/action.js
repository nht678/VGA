import { apiUser } from "src/services/userServices";

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


export function actUserGetAsync() {
    return async (dispatch) => {
        try {
            const response = await apiUser.get('/users');
            dispatch(actUserGet(response.data));
        } catch (error) {
            console.log(error);
        }
    };
}

export function actAddUserAsync(data) {
    return async (dispatch) => {
        try {
            const response = await apiUser.post('/users', data);
            dispatch(actAddUser(response.data));
        } catch (error) {
            console.log(error);
        }
    };
}
export function actUserUpdateAsync(data,id) {
    return async (dispatch) => {
        try {
            console.log("data",data,id);
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