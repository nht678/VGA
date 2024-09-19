
// const usersReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'ACT_USER_GET':
//             return {
//             users: action.payload,
//         }
//         case 'ADD_USER':
//             return {
//                 users: [...state.users, action.payload]
//             };
//         case 'UPDATE_USER':
//             return {
//                 users: state.users.map((user) =>
//                     user.id === action.payload.id ? action.payload : user
//                 )
//             };
//         case 'REMOVE_USER':
//             return {
//                 users: state.users.filter((user) => user.id !== action.payload)
//             };
//             default:
//                 return state;
//             }
//         };
//         // case 'ADD_USER':
//         //     return [...state, action.payload];
//         // case 'REMOVE_USER':
//         //     return state.filter((user) => user.id !== action.payload);
//         // case 'UPDATE_USER':
//         //     return state.map((user) =>
//         //         user.id === action.payload.id ? action.payload : user
//         //     );

// export default usersReducer;
// const initialState = {
//     users: [],       // Lưu danh sách sinh viên
//     totalCount: 0,   // Tổng số lượng sinh viên
//     currentPage: 1,  // Trang hiện tại
//   };
  
//   const usersReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'GET_USERS_SUCCESS':
//         return {
//           ...state,
//           users: action.payload.students,  // Cập nhật danh sách sinh viên
//           totalCount: action.payload.total, // Cập nhật tổng số lượng sinh viên
//           currentPage: action.payload.currentPage, // Cập nhật trang hiện tại
//         };
//       case 'GET_USERS_ERROR':
//         return {
//           ...state,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
const initialState = {
    students: [],
    total: 0,
    currentPage: 1,
    error: null,
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USERS_SUCCESS':
        return {
          ...state,
          students: action.payload.students,
          total: action.payload.total,
          currentPage: action.payload.currentPage,
        };
      case 'GET_USERS_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default usersReducer;