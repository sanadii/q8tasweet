import { backend_url } from "../../components/Constant/Config"

export const getAllRole = dispatch => {
    fetch(backend_url + 'getAllRole', { method: 'GET' })
        .then(response => response.json())
        .then(async data => {
            dispatch({ type: "GET_SUCCESS_ALL_ROLE", payload: data.data })
        })
        .catch(err => console.log(err));
}