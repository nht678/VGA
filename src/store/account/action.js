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

export function signinUser(data) {
    return async (dispatch) => {
        try {
            const response = await accountService.login(data);
            console.log('Response:', response); // In ra để kiểm tra
            dispatch(actLogin(response));
            localStorage.setItem('userInfo', JSON.stringify(response));
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('userId', response.userId);
            // localStorage.setItem('name', response.name);
            localStorage.setItem('role', response.role);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log('userInfo', userInfo);
        }
        catch (error) {
            console.log('Error:', error); // In lỗi để kiểm tra
        }
    }
}

export function signoutUser() {
    const userId = localStorage.getItem('userId');
    console.log('userId', userId);
    const token = localStorage.getItem('token');
    return (dispatch) => {
        try {
            dispatch(actSignOut());
            // Trả về Promise của accountService.logout
            const response = accountService.logout(userId, token);
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            // localStorage.removeItem('name');
            localStorage.removeItem('role');
        } catch (error) {
            console.log('Error:', error);
        }
    };
}
