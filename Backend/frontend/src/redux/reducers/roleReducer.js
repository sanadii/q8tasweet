const initialState = {
    data: []
}

const roleReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case "GET_SUCCESS_ALL_ROLE":
            return {
                ...state,
                data: payload
            }
        default:
            return state;
    }
}

export default roleReducer