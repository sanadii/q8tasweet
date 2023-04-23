import { backend_url } from "../../components/Constant/Config"
import Swal from "sweetalert2";

export const getCandidateDetail = ({ data, userid }, dispatch) => {
    fetch(backend_url + 'getUserTeamCount/?id=' + userid, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "GET_SUCCESS_COUNT", payload: data.data })
        });
    fetch(backend_url + 'getMyTeamId/?limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum + '&userid=' + userid, { method: 'GET' })
        .then(response => response.json())
        .then(async data => {
            dispatch({ type: "GET_SUCCESS_USERETAIL", payload: data })
        });
}

export const getSupervisorDetail = ({ data, userid }, dispatch) => {
    fetch(backend_url + 'getSupervisorTeamCount/?id=' + userid, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            dispatch({ type: "GET_SUCCESS_COUNT", payload: data.data })
        });
    fetch(backend_url + 'getMyCandidateId/?limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum + '&userid=' + userid, { method: 'GET' })
        .then(response => response.json())
        .then(async data => {
            dispatch({ type: "GET_SUCCESS_USERETAIL", payload: data })
        });
}

export const getGuanatorDetail = ({ data, userid, id }, dispatch) => {
    // fetch(backend_url + 'getGuanatorTeamCount/?id=' + userid, { method: 'GET' })
    //     .then(response => response.json())
    //     .then(data => {
    //         dispatch({ type: "GET_SUCCESS_COUNT", payload: data.data })
    //     });
    fetch(backend_url + 'getMyGuanatorId/?id=' + id + '&limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum + '&userid=' + userid, { method: 'GET' })
        .then(response => response.json())
        .then(async data => {
            dispatch({ type: "GET_SUCCESS_USERETAIL", payload: data })
        });
}