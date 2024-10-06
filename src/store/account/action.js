import { baseAPI } from "../../services/account";
// send information to the server to signin the user
export function signinUser(data) {
    console.log('data:', data);
    return async (dispatch) => {
        try {
            dispatch({ type: 'SIGNIN_USER_REQUEST' });
            const response = await baseAPI.post('/login', data);
            dispatch({ type: 'SIGNIN_USER_SUCCESS', payload: response.data });
            console.log('response.data:', response.data);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
        } catch (error) {
            console.log('Error:', error); // In lỗi để kiểm tra
            dispatch({ type: 'SIGNIN_USER_FAIL', payload: error.response?.data?.message || 'Something went wrong' });
        }
    };
}