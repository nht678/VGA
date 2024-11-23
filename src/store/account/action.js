import { message } from 'antd';

import accountService from "../../services/accountService"

export const LOGIN_USER = 'LOGIN_USER';
export const SIGN_OUT = 'SIGN_OUT';

export function actLogin(data) {
    return {
        type: LOGIN_USER,
        payload: data,
    };
}

export function actSignOut() {
    return {
        type: SIGN_OUT,
    };
}

export function signinUser(data, navigate) {
    return async (dispatch) => {
        try {
            const response = await accountService.login(data);
            if (response.status === 200) {
                message.success('Đăng nhập thành công');
                navigate('/', { replace: true });
                dispatch(actLogin(response.data));
            } else {
                message.error('Đăng nhập thất bại');
            }
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('accountId', response.data.accountId);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log('userInfo', userInfo);
        }
        catch (error) {
            console.log('Error:', error); // In lỗi để kiểm tra
            message.error('Lỗi đăng nhập');
        }
    }
}

export function signinUserStudent(data, navigate) {
    return async (dispatch) => {
        try {
            const response = await accountService.login(data);
            if (response.status === 200) {
                message.success('Đăng nhập thành công');
                navigate('/paymentbegin', { replace: true });
                dispatch(actLogin(response.data));
            } else {
                message.error('Đăng nhập thất bại');
            }
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('accountId', response.data.accountId);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log('userInfo', userInfo);
        }
        catch (error) {
            console.log('Error:', error); // In lỗi để kiểm tra
            message.error('Lỗi đăng nhập');
        }
    }
}

export function signoutUserStudent(accountId, navigate) {
    const token = localStorage.getItem('token');
    return async (dispatch) => {
        try {
            // dispatch(actSignOut());
            // Trả về Promise của accountService.logout
            const response = await accountService.logout(accountId, token);
            if (response.status === 200) {
                message.success('Đăng xuất thành công');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('name');
                localStorage.removeItem('role');
                localStorage.removeItem('accountId');
                navigate('/signinpayment', { replace: true });
            } else {
                message.error('Đăng xuất thất bại');
            }

        } catch (error) {
            console.log('Error:', error);
            message.error('Lỗi đăng xuất');
        }
    };
}


export function signoutUser(accountId, navigate) {
    const token = localStorage.getItem('token');
    return async (dispatch) => {
        try {
            dispatch(actSignOut());
            // Trả về Promise của accountService.logout
            const response = await accountService.logout(accountId, token);
            if (response.status === 200) {
                message.success('Đăng xuất thành công');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('name');
                localStorage.removeItem('role');
                localStorage.removeItem('accountId');
                navigate('/signin', { replace: true });
            } else {
                message.error('Đăng xuất thất bại');
            }

        } catch (error) {
            console.log('Error:', error);
            message.error('Lỗi đăng xuất');
        }
    };
}
