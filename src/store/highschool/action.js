
import { message } from 'antd';
import highschoolService from '../../services/highschoolService';

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


// export const actHighSchoolGetAsync = ({ page, pageSize, search }) => async (dispatch) => {
//     try {
//         const response = await apiHighSchool.get('high-schools', {
//             params: {
//                 'current-page': page,
//                 'page-size': pageSize,
//                 name: search || '',
//             },
//         });
//         console.log('responseactHighSchoolGetAsync:', response);
//         dispatch({
//             type: 'GET_HIGH_SCHOOLS_SUCCESS',
//             payload: {
//                 highschools: response.data.highschools, // Lấy danh sách sinh viên
//                 total: response.data.total,       // Lấy tổng số sinh viên
//                 currentPage: response.data.currentPage, // Lấy trang hiện tại

//             },
//         });
//     } catch (error) {
//         dispatch({
//             type: 'GET_HIGH_SCHOOLS_ERROR',
//             payload: error,
//         });
//     }
// };

// export function actAddHighSchoolAsync(data) {
//     return async (dispatch) => {
//         try {
//             console.log('data:', data);
//             const response = await apiHighSchool.post('high-school', data);
//             dispatch(actAddHighSchool(response.data));
//             // dispatch(actHighSchoolGetAsync({ page: 1, pageSize: 10 }));
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }
// export function actHighSchoolUpdateAsync(data, id) {
//     return async (dispatch) => {
//         try {
//             const response = await apiHighSchool.put(`high-school/${id}`, data);
//             console.log('response1', response)
//             dispatch(actHighSchoolUpdate(response.data));
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }
// export function actHighSchoolDeleteAsync(id) {
//     return async (dispatch) => {
//         try {
//             const response = await apiHighSchool.delete(`high-school/${id}`);
//             console.log('response:', response);
//             dispatch(actHighSchoolDelete(id));
//             // dispatch(actHighSchoolGetAsync({ page: 1, pageSize: 10 }));
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }


// export function actResetHighSchoolAsync(dispatch) {
//     return async () => {
//         try {
//             dispatch(resetHighSchoolSuccess());
//         } catch (error) {
//             console.log(error);
//         }
//     };
// }

export const actHighSchoolGetAsync = ({ page, pageSize, search }) => async (dispatch) => {
    try {
        const response = await highschoolService.getHighSchools({ page, pageSize, search });
        if (response) {
            dispatch(actHighSchoolGet(response));
        }
    } catch (error) {
        console.error(error);
    }
};

export const actAddHighSchoolAsync = (data) => async (dispatch) => {
    try {
        const response = await highschoolService.addHighSchool(data);
        if (response.status === 200 || response.status === 201) {
            dispatch(actAddHighSchool(response));
            message.success('Thêm mới thành công');
        } else {
            message.error('Thêm mới thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Thêm mới thất bại');
    }
};

export const actHighSchoolUpdateAsync = ({ formData, id }) => async (dispatch) => {
    try {
        debugger
        const response = await highschoolService.updateHighSchool({ id, formData });
        debugger
        if (response.status === 200 || response.status === 201) {
            message.success('Cập nhật thành công');
            dispatch(actHighSchoolUpdate(response));
        } else {
            message.error('Cập nhật thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Cập nhật thất bại');
    }
};

export const actHighSchoolDeleteAsync = (id) => async (dispatch) => {
    try {
        debugger
        const response = await highschoolService.deleteHighSchool(id);
        if (response.status === 200 || response.status === 201) {
            message.success('Xóa thành công');
            dispatch(actHighSchoolDelete(id));
        } else {
            message.error('Xóa thất bại');
        }
    } catch (error) {
        console.error(error);
        message.error('Xóa thất bại');
    }
};

export const actResetHighSchoolAsync = () => async (dispatch) => {
    try {
        dispatch(resetHighSchoolSuccess());
    } catch (error) {
        console.error(error);
    }
};

