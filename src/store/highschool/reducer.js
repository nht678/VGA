import { success } from "src/theme/palette";

const initialState = {
    highschools: [], // hoặc là một đối tượng khác tuỳ bạn
    success: false,
    error: null,
};

const highschoolReducer = (state = initialState, action) => {
    console.log('action:', action);
    switch (action.type) {
        case 'GET_HIGH_SCHOOLS_SUCCESS':
            return {
                ...state,
                highschools: action.payload.highschools,
                total: action.payload.total,
                currentPage: action.payload.currentPage,
                success: true,
            };
        case 'CREATE_HIGH_SCHOOL_SUCCESS':
            return {
                ...state,
                highschools: [...state.highSchools, action.payload],
                success: true, // Cập nhật success khi tạo thành công
            };
        case 'CREATE_HIGH_SCHOOL_FAILURE':
            return {
                ...state,
                error: action.payload, // Cập nhật lỗi nếu tạo thất bại
                success: false,
            };
        case 'RESET_HIGH_SCHOOL_STATUS': // Xử lý việc reset trạng thái
            return {
                ...state,
                success: false,
                error: null,
            };
        default:
            return state;
    }
}
export default highschoolReducer;