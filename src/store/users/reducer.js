

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

import { ca } from "date-fns/locale";
import { success } from "src/theme/palette";

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
  usersSuccess: false,
};
console.log('initialState.usersSuccess:', initialState.usersSuccess);
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        students: action.payload.students,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        usersSuccess: false,
      };
    case 'GET_USERS_ERROR':
      return {
        ...state,
        error: action.payload,
        usersSuccess: false,
      };
    case 'ADD_USER':
      console.log('initialState.usersSuccess:', initialState.usersSuccess)
      return {
        ...state,
        students: [...state.students, action.payload],
        usersSuccess: true,

      };
    case 'UPDATE_USER':
      return {
        ...state,
        usersSuccess: true,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student,
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        students: state.students.filter((student) => student.id !== action.payload),
        usersSuccess: true,
      };
    case 'RESET_USER_SUCCESS':
      return {
        ...state,
        usersSuccess: false,
      };

    default:
      return state;
  }
};

export default usersReducer;