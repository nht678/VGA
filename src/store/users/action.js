
import message from 'antd/lib/message';

import userServices from '../../services/userServices';

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
export const resetUserSuccess = () => ({
    type: 'RESET_USER_SUCCESS',
});


export function actUserGetAsync({ page, pageSize, highSchoolId, search, schoolYears }) {
    return async (dispatch) => {
        try {
            const data = await userServices.getUsers({ page, pageSize, highSchoolId, search, schoolYears });
            dispatch(actUserGet(data));
        } catch (error) {
            console.log(error);
        }
    };
}

export function actAddUserAsync(data) {
    return async (dispatch) => {
        try {
            const response = await userServices.addUser(data);
            console.log('response.status:', response.status);
            if (response) {
                dispatch(actAddUser(response));
                message.success('Thêm mới thành công');
            } else {
                message.error('Thêm mới thất bại');
            }
        } catch (error) {
            console.log(error);
        }
    };
}

export function actUserUpdateAsync(data, userId) {
    return async (dispatch) => {
        try {
            const response = await userServices.updateUser(data, userId);
            if (response) {
                dispatch(actUserUpdate(response));
                message.success('Cập nhật thành công');
            } else {
                message.error('Cập nhật thất bại');
            }
        } catch (error) {
            console.log(error);
        }
    };
}
export function actUserDeleteAsync(id) {
    return async (dispatch) => {
        try {
            const response = await userServices.deleteUser(id);
            if (response) {
                dispatch(actUserDelete(id));
                message.success('Xóa thành công');
            } else {
                message.error('Xóa thất bại');
            }
        } catch (error) {
            console.log(error);
        }
    };
}






// export function actAddUserAsync(data) {
//     console.log('data:', data);
//     return async (dispatch) => {
//         try {
//             const response = await apiUser.post('', data);
//             dispatch(actAddUser(response.data));
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }

// export function actUserUpdateAsync(data, id) {
//     return async (dispatch) => {
//         try {
//             const response = await apiUserUpdate.put(`/${id}`, data);
//             dispatch(actUserUpdate(response.data));
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }
// export function actUserDeleteAsync(id) {
//     return async (dispatch) => {
//         try {
//             const response = await apiUser.delete(`/users/${id}`);
//             dispatch(actUserDelete(id));
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }

