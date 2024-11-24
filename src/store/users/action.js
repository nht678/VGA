
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
            const response = await userServices.getUsers({ page, pageSize, highSchoolId, search, schoolYears });
            if (response.status === 200) {
                dispatch(actUserGet(response.data));
            }
        } catch (error) {
            console.log(error);
            message.error('Lấy dữ liệu thất bại');
        }
    };
}

export function actAddUserAsync(data) {
    return async (dispatch) => {
        try {
            const response = await userServices.addUser(data);
            if (response.status === 201 || response.status === 200) {
                dispatch(actAddUser(response));
                message.success('Thêm mới thành công');
            } else {
                message.error('Thêm mới thất bại');
            }
        } catch (error) {
            console.log(error);
            message.error('Lỗi gì đó');
        }
    };
}

export function actUserUpdateAsync(data, userId) {
    return async (dispatch) => {
        try {
            const response = await userServices.updateUser(data, userId);
            if (response.status === 200 || response.status === 201) {
                dispatch(actUserUpdate(response));
                message.success('Cập nhật thành công');
            } else {
                message.error('Cập nhật thất bại');
            }
        } catch (error) {
            console.log(error);
            message.error('Cập nhật thất bại');
        }
    };
}
export function actUserDeleteAsync(id) {
    return async (dispatch) => {
        try {
            const response = await userServices.deleteUser(id);
            if (response.status === 200) {
                dispatch(actUserDelete(id));
                message.success('Xóa thành công');
            } else {
                message.error('Xóa thất bại');
            }
        } catch (error) {
            console.log(error);
            message.error('Xóa thất bại');
        }
    };
}

export function actUserBan({ changeStatus, accountId }) {
    return async (dispatch) => {
        try {
            const response = await userServices.banAccount({ changeStatus, accountId });
            if (response.status === 200) {
                message.success('Chuyển đổi trạng thái tài khoản thành công');
            } else {
                message.error('Chuyển đổi trạng thái tài khoản thất bại');
            }
        } catch (error) {
            console.log(error);
            message.error('Chuyển đổi trạng thái tài khoản thất bại');
        }
    };
}



