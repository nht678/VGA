
import { func } from 'prop-types';
import reportService from '../../services/reportService';

export const GET_REPORT = "GET_REPORT";
export const RESET = "RESET";

export const actGetReport = (data) => ({
    type: GET_REPORT,
    payload: data,
});

export const actReset = () => ({
    type: RESET,
});


export const getReport = ({ page, pageSize, search, TypeBooking, consultantID }) => async (dispatch) => {
    console.log('getReport', page, pageSize, search, TypeBooking, consultantID);
    debugger
    const response = await reportService.getReports({ page, pageSize, search, TypeBooking, consultantID });
    dispatch(actGetReport(response.data));
}
