import { message } from 'antd';
import dashBoardService from '../../services/dashBoardService';

export const GET_DASHBOARD = 'GET_DASHBOARD';

export const getDashBoard = () => async (dispatch) => {
    try {
        const response = await dashBoardService.getDashBoard();
    } catch (error) {
        message.error(error.response.data.message);
    }
}
// export default dashBoardService;