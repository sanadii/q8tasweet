const initialState = {
    data: []
}

const rankReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case "GET_SUCCESS_ALL_RANK":
            return {
                ...state,
                data: payload
            }
        default:
            return state;
    }
}

export default rankReducer