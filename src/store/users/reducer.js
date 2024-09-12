
const usersReducer = (state = [], action) => {
    switch (action.type) {
        case 'ACT_USER_GET':
            return {
            users: action.payload,
        }
        case 'ADD_USER':
            return {
                users: [...state.users, action.payload]
            };
        case 'UPDATE_USER':
            return {
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                )
            };
        case 'REMOVE_USER':
            return {
                users: state.users.filter((user) => user.id !== action.payload)
            };
            default:
                return state;
            }
        };
        // case 'ADD_USER':
        //     return [...state, action.payload];
        // case 'REMOVE_USER':
        //     return state.filter((user) => user.id !== action.payload);
        // case 'UPDATE_USER':
        //     return state.map((user) =>
        //         user.id === action.payload.id ? action.payload : user
        //     );

export default usersReducer;