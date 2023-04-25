import { backend_url } from "../../components/Constant/Config"

export const getAllRank = dispatch => {
    fetch(backend_url + 'getAllRank', { method: 'GET' })
        .then(response => response.json())
        .then(async data => {
            dispatch({ type: "GET_SUCCESS_ALL_RANK", payload: data.data })
        })
        .catch(err => console.log(err));
}