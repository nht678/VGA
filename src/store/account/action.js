import { baseAPI } from "../../services/account";
// send information to the server to signin the user
// const userInfo = localStorage.getItem('userInfo');
// const token = userInfo ? JSON.parse(userInfo).accessToken : '';
// const highSchoolId = userInfo ? JSON.parse(userInfo).highSchoolId : '';
// console.log('userInfo:', userInfo);
// console.log('token:', token);
// console.log('highSchoolId:', highSchoolId);


export function signinUser(data) {
    console.log('data:', data);
    return async (dispatch) => {
        try {
            dispatch({ type: 'SIGNIN_USER_REQUEST' });
            const response = await baseAPI.post('/login', data);
            dispatch({ type: 'SIGNIN_USER_SUCCESS', payload: response.data });
            console.log('response.data:', response.data);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('highSchoolId', response.data.highSchoolId);
        } catch (error) {
            console.log('Error:', error); // In lỗi để kiểm tra
            dispatch({ type: 'SIGNIN_USER_FAIL', payload: error.response?.data?.message || 'Something went wrong' });
        }
    };
}




export function signoutUser() {
    const highSchoolId = localStorage.getItem('highSchoolId');
    const token = localStorage.getItem('token');
    return async (dispatch) => {
        try {

            const response = await baseAPI.post(`/logout/${highSchoolId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log('response:', response);
            dispatch({ type: 'SIGN_OUT' });
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            localStorage.removeItem('highSchoolId');
        }
        catch (error) {
            console.log('Error:', error); // In lỗi để kiểm tra
            dispatch({ type: 'SIGN_OUT_FAIL', payload: error.response?.data?.message || 'Something went wrong' });
        }
    };
}

