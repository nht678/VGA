
import { message } from 'antd';
import reportService from '../../services/reportService';

export const GET_REPORT = "GET_REPORT";
export const RESET = "RESET";
export const HANDLE_REPORT = "HANDLE_REPORT";

export const actGetReport = (data) => ({
    type: GET_REPORT,
    payload: data,
});

export const actReset = () => ({
    type: RESET,
});

export const handleReport = (data) => ({
    type: HANDLE_REPORT,
    payload: data,
});

export const getReport = ({ page, pageSize, search, TypeBooking, consultantID }) => async (dispatch) => {
    console.log('getReport', page, pageSize, search, TypeBooking, consultantID);
    const response = await reportService.getReports({ page, pageSize, search, TypeBooking, consultantID });
    dispatch(actGetReport(response.data));
}


export const actHandleReport = (id, data) => async (dispatch) => {
    try {
        const response = await reportService.handleReport(id, data);
        if (response.status === 200) {
            message.success('Xử lý báo cáo thành công');
            dispatch(handleReport(response.data));
        } else {
            message.error('Xử lý báo cáo thất bại');
        }
    }
    catch (error) {
        message.error('Xử lý báo cáo thất bại');
    }
}



