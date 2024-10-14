
const initialState = {
  students: [],
  total: 0,
  currentPage: 1,
  error: null,
  usersSuccess: false,
};
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACT_USER_GET':
      return {
        ...state,
        students: action.payload.students,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
        usersSuccess: true,
      };
    case 'ADD_USER':
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