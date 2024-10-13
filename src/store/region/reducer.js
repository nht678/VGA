
const initialState = {
    regions: [],
};

const regionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ACT_REGION_GET':
            return {
                ...state,
                regions: action.payload,
            };
        default:
            return state;
    }
}
export default regionReducer;