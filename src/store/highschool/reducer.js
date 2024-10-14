

const initialState = {
    highschools: [], // hoặc là một đối tượng khác tuỳ bạn
    successHighSchool: false,
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
                successHighSchool: true,
            };
        case 'ADD_HIGH_SCHOOL':
            return {
                ...state,
                highschools: [...state.highschools, action.payload],
                successHighSchool: true, // Cập nhật success khi tạo thành công
            };
        case 'UPDATE_HIGH_SCHOOL':
            return {
                ...state,
                highschools: state.highschools.map((highschool) =>
                    highschool.id === action.payload.id ? action.payload : highschool,
                ),
                successHighSchool: true,
            };
        case 'DELETE_HIGH_SCHOOL':
            return {
                ...state,
                highschools: state.highschools.filter((highschool) => highschool.id !== action.payload),
                successHighSchool: true,
            };

        case 'RESET_HIGH_SCHOOL_SUCCESS': // Xử lý việc reset trạng thái
            return {
                ...state,
                successHighSchool: false,
                error: null,
            };
        default:
            return state;
    }
}
export default highschoolReducer;