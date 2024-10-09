

import { apiHighSchool } from "src/services/apiHighSchool";

export const ACT_HIGH_SCHOOL_GET = 'ACT_HIGH_SCHOOL_GET';
export const ADD_HIGH_SCHOOL = 'ADD_HIGH_SCHOOL';
export const UPDATE_HIGH_SCHOOL = 'UPDATE_HIGH_SCHOOL';
export const DELETE_HIGH_SCHOOL = 'DELETE_HIGH_SCHOOL';

export function actHighSchoolGet(data) {
    return {
        type: ACT_HIGH_SCHOOL_GET,
        payload: data,
    };
}

export function actAddHighSchool(data) {
    return {
        type: ADD_HIGH_SCHOOL,
        payload: data,
    };
}
export function actHighSchoolUpdate(data) {
    return {
        type: UPDATE_HIGH_SCHOOL,
        payload: data,
    };
}
export function actHighSchoolDelete(id) {
    return {
        type: DELETE_HIGH_SCHOOL,
        payload: id,
    };
}
export const resetHighSchoolSuccess = () => ({
    type: 'RESET_HIGH_SCHOOL_SUCCESS',
});


export const actHighSchoolGetAsync = ({ page, pageSize }) => async (dispatch) => {
    try {
        const response = await apiHighSchool.get('', {
            params: {
                'current-page': page,
                'page-size': pageSize,
            },
        });
        console.log('responseactHighSchoolGetAsync:', response);
        dispatch({
            type: 'GET_HIGH_SCHOOLS_SUCCESS',
            payload: {
                highschools: response.data.highschools, // Lấy danh sách sinh viên
                total: response.data.total,       // Lấy tổng số sinh viên
                currentPage: response.data.currentPage, // Lấy trang hiện tại

            },
        });
    } catch (error) {
        dispatch({
            type: 'GET_HIGH_SCHOOLS_ERROR',
            payload: error,
        });
    }
};

export function actAddHighSchoolAsync(data) {
    console.log('data:', data);
    return async (dispatch) => {
        try {
            const response = await apiHighSchool.post('', data);
            dispatch(actAddHighSchool(response.data));
        } catch (error) {
            console.log(error);
        }
    };
}
export function actHighSchoolUpdateAsync(data, id) {
    return async (dispatch) => {
        try {
            const response = await apiHighSchool.put(`/${id}`, data);
            dispatch(actHighSchoolUpdate(response.data));
        } catch (error) {
            console.log(error);
        }
    };
}
export function actHighSchoolDeleteAsync(id) {
    return async (dispatch) => {
        try {
            const response = await apiHighSchool.delete(`/${id}`);
            dispatch(actHighSchoolDelete(id));
        } catch (error) {
            console.log(error);
        }
    };
}
