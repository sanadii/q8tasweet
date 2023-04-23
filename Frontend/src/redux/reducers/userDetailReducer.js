const initialState = {
    userData: [],
    userDataCount: 0,
    teamCount: []
}

const userDetailReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case "GET_SUCCESS_USERETAIL":
            return {
                ...state,
                userData: payload.data,
                userDataCount: payload.count
            }
        case "GET_SUCCESS_COUNT":
            return {
                ...state,
                teamCount: payload
            }
        default:
            return state;
    }
}

export default userDetailReducer