import { message } from 'antd';
import regionService from '../../services/regionService';

// Action types
// export const ACT_REGION_GET = 'ACT_REGION_GET';

export function actRegionGet(data) {
    return {
        type: 'ACT_REGION_GET',
        payload: data,
    };
}

// export function actRegionGet(data) {
//     return {
//         type: ACT_REGION_GET,
//         payload: data,
//     };
// }


// export function actGetRegionAsync() {
//     return async (dispatch) => {
//         try {
//             const response = await apiRegion.get('');
//             console.log('response:', response);
//             dispatch(actRegionGet(response.data));
//         } catch (error) {
//             console.log('error:', error);
//         }
//     };
// }

export const actGetRegionAsync = () => async (dispatch) => {
    try {
        const response = await regionService.getRegions();
        if (response.status === 200) {
            dispatch(actRegionGet(response.data));
        }
    } catch (error) {
        console.error(error);
        message.error('Lấy dữ liệu thất bại');
    }
}


