
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