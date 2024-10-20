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
            dispatch(actLogin(response));
            localStorage.setItem('userInfo', JSON.stringify(response));
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('highSchoolId', response.highSchoolId);
            localStorage.setItem('name', response.name);
            localStorage.setItem('role', response.role);

        }
        catch (error) {
            console.log('Error:', error); // In lỗi để kiểm tra
        }
    }
}

export function signoutUser() {
    const highSchoolId = localStorage.getItem('highSchoolId');
    const token = localStorage.getItem('token');
    return (dispatch) => {
        try {
            dispatch(actSignOut());
            // Trả về Promise của accountService.logout
            const response = accountService.logout(highSchoolId, token);
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            localStorage.removeItem('highSchoolId');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
        } catch (error) {
            console.log('Error:', error);
        }
    };
}
