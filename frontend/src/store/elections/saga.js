import { call, put, takeEvery, all, fork, take } from "redux-saga/effects";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Election Redux States
import {
  GET_ELECTIONS,
  GET_ELECTION_COUNT,
  GET_ELECTION_DETAILS,
  ADD_ELECTION,
  DELETE_ELECTION,
  UPDATE_ELECTION,

  // Election Candidates ---------------
  GET_ELECTION_CANDIDATES,
  ADD_NEW_ELECTION_CANDIDATE,
  DELETE_ELECTION_CANDIDATE,
  UPDATE_ELECTION_CANDIDATE,
  // GET_ELECTION_CANDIDATE_DETAILS,
  // GET_ELECTION_CANDIDATE_COUNT,

  // Election Committees ---------------
  GET_ELECTION_COMMITTEES,
  ADD_NEW_ELECTION_COMMITTEE,
  DELETE_ELECTION_COMMITTEE,
  UPDATE_ELECTION_COMMITTEE,
  // GET_ELECTION_COMMITTEE_DETAILS,
  // GET_ELECTION_COMMITTEE_COUNT,


  // Election Committee Results
  UPDATE_ELECTION_COMMITTEE_RESULTS,

  // Election Campaign ---------------
  GET_ELECTION_CAMPAIGNS,
  ADD_NEW_ELECTION_CAMPAIGN,
  DELETE_ELECTION_CAMPAIGN,
  UPDATE_ELECTION_CAMPAIGN,
  GET_ELECTION_CAMPAIGN_DETAILS,
  GET_ELECTION_CAMPAIGN_COUNT,

} from "./actionType";

import {
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAIL,
} from "../uploadImage/actionType";

import {
  // getElections, getElectionDetails, getElectionsCount
  // API Response
  ElectionApiResponseSuccess,
  ElectionApiResponseError,

  // Elections ---------------
  addElectionSuccess,
  addElectionFail,
  updateElectionSuccess,
  updateElectionFail,
  deleteElectionSuccess,
  deleteElectionFail,

  // Election Candidates ---------------
  addElectionCandidateSuccess,
  addElectionCandidateFail,
  updateElectionCandidateSuccess,
  updateElectionCandidateFail,
  deleteElectionCandidateSuccess,
  deleteElectionCandidateFail,

  // Election Committees ---------------
  addElectionCommitteeSuccess,
  addElectionCommitteeFail,
  updateElectionCommitteeSuccess,
  updateElectionCommitteeFail,
  deleteElectionCommitteeSuccess,
  deleteElectionCommitteeFail,

  // Election Committees ---------------
  updateElectionCommitteeResultsSuccess,
  updateElectionCommitteeResultsFail,

  // Election Campaigns ---------------
  addElectionCampaignSuccess,
  addElectionCampaignFail,
  updateElectionCampaignSuccess,
  updateElectionCampaignFail,
  deleteElectionCampaignSuccess,
  deleteElectionCampaignFail,

} from "./action";

import { uploadNewImage } from "../uploadImage/action";

//Include Both Helper File with needed methods
import {
  // Elections ---------------
  getElections as getElectionsApi,
  getElectionCount as getElectionCountApi,
  getElectionDetails as getElectionDetailsApi,
  addElection,
  updateElection,
  deleteElection,

  // Election Candidates ---------------
  getElectionCandidates as getElectionCandidatesApi,
  // getElectionCandidateDetails as getElectionCandidateDetailsApi,
  // getElectionCandidateCount as getElectionCandidateCountApi,
  addNewElectionCandidate,
  updateElectionCandidate,
  deleteElectionCandidate,

  // Election Committees ---------------
  getElectionCommittees as getElectionCommitteesApi,
  // getElectionCommitteeDetails as getElectionCommitteeDetailsApi,
  // getElectionCommitteeCount as getElectionCommitteeCountApi,
  addNewElectionCommittee,
  updateElectionCommittee,
  deleteElectionCommittee,

  // Election Committee Results ---------------
  updateElectionCommitteeResults,

  // Election Campaigns ---------------
  getElectionCampaigns as getElectionCampaignsApi,
  // getElectionCampaignDetails as getElectionCampaignDetailsApi,
  // getElectionCampaignCount as getElectionCampaignCountApi,
  addNewElectionCampaign,
  updateElectionCampaign,
  deleteElectionCampaign,
} from "../../helpers/backend_helper";

function* getElections() {
  try {
    const response = yield call(getElectionsApi);
    yield put(ElectionApiResponseSuccess(GET_ELECTIONS, response.data));
    yield put(ElectionApiResponseSuccess(GET_ELECTION_COUNT, response.counts));
  } catch (error) {
    yield put(ElectionApiResponseError(GET_ELECTIONS, error));
  }
}

function* getElectionCount() {
  try {
    const response = yield call(getElectionCountApi);
    yield put(ElectionApiResponseSuccess(GET_ELECTION_COUNT, response.data));
  } catch (error) {
    yield put(ElectionApiResponseError(GET_ELECTION_COUNT, error));
  }
}

function* getElectionDetails({ payload: election }) {
  try {
    const response = yield call(getElectionDetailsApi, election);
    yield put(ElectionApiResponseSuccess(GET_ELECTION_DETAILS, response.data));
  } catch (error) {
    yield put(ElectionApiResponseError(GET_ELECTION_DETAILS, error));
  }
}

function* onAddElection({ payload: { election, formData } }) {
  try {
    // Check if formData contains an image
    if (formData && formData.get("image")) {
      // Dispatch the uploadNewImage action with the formData & Wait for the upload to succeed before proceeding
      yield put(uploadNewImage(formData));
      const { payload: uploadResponse } = yield take(UPLOAD_IMAGE_SUCCESS);

      // Replace backslashes in image URL with forward slashes & update the image field in election object with new url
      const formattedImageUrl = uploadResponse.url.replace(/\\/g, "/");
      const updatedElection = {
        ...election,
        image: formattedImageUrl,
      };

      // Call the API function to add a new election & Dispatch the addElectionSuccess action with the received data
      const addElectionResponse = yield call(addElection, updatedElection);
      yield put(addElectionSuccess(addElectionResponse));

      toast.success("Election Added Successfully", { autoClose: 2000 });
    } else {
      // Call the API function to add a new election without uploading an image
      const addElectionResponse = yield call(addElection, election);
      yield put(addElectionSuccess(addElectionResponse));

      toast.success("Election Added Successfully", { autoClose: 2000 });
    }
  } catch (error) {
    yield put(addElectionFail(error));
    toast.error("Election Added Failed", { autoClose: 2000 });
  }
}


function* onDeleteElection({ payload: election }) {
  try {
    const response = yield call(deleteElection, election);
    yield put(deleteElectionSuccess({ election, ...response }));
    toast.success("Election Delete Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteElectionFail(error));
    toast.error("Election Delete Failed", { autoClose: 2000 });
  }
}

function* onUpdateElection({ payload: { election, formData } }) {
  try {
    let uploadResponse;

    // Check if an image is selected (formData contains a selected file)
    if (formData && formData.get("image")) {
      // Dispatch the uploadNewImage action with the formData & Wait for the upload to succeed before proceeding
      yield put(uploadNewImage(formData));
      const action = yield take([UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAIL]);
      if (action.type === UPLOAD_IMAGE_SUCCESS) {
        uploadResponse = action.payload;
      } else {
        throw new Error("Image Upload Failed");
      }
    }

    // Replace backslashes in image URL with forward slashes & update the image field in the election object with the new URL
    const formattedImageUrl = uploadResponse?.url?.replace(/\\/g, "/");
    const updatedElection = {
      ...election,
      image: formattedImageUrl,
    };

    // Call the API function to update the election & Dispatch the updateElectionSuccess action with the received data
    const updateElectionResponse = yield call(updateElection, updatedElection);
    yield put(updateElectionSuccess(updateElectionResponse));

    toast.success("Election Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateElectionFail(error));
    toast.error("Election Updated Failed", { autoClose: 2000 });
  }
}

// Election Candidates ---------------
function* getElectionCandidates({ payload: election }) {
  try {
    const response = yield call(getElectionCandidatesApi, election);
    yield put(
      ElectionApiResponseSuccess(GET_ELECTION_CANDIDATES, response.data)
    );
  } catch (error) {
    yield put(ElectionApiResponseError(GET_ELECTION_CANDIDATES, error));
  }
}

function* onAddNewElectionCandidate({ payload: electionCandidate }) {
  try {
    const response = yield call(addNewElectionCandidate, electionCandidate);
    yield put(addElectionCandidateSuccess(response));
    toast.success("ElectionCandidate Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addElectionCandidateFail(error));
    toast.error("ElectionCandidate Added Failed", { autoClose: 2000 });
  }
}

function* onDeleteElectionCandidate({ payload: electionCandidate }) {
  try {
    const response = yield call(deleteElectionCandidate, electionCandidate);
    yield put(
      deleteElectionCandidateSuccess({ electionCandidate, ...response })
    );
    toast.success("ElectionCandidate Delete Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteElectionCandidateFail(error));
    toast.error("ElectionCandidate Delete Failed", { autoClose: 2000 });
  }
}

function* onUpdateElectionCandidate({ payload: electionCandidate }) {
  try {
    const response = yield call(updateElectionCandidate, electionCandidate);
    yield put(updateElectionCandidateSuccess(response));
    toast.success("ElectionCandidate Updated Successfully", {
      autoClose: 2000,
    });
  } catch (error) {
    yield put(updateElectionCandidateFail(error));
    toast.error("ElectionCandidate Updated Failed", { autoClose: 2000 });
  }
}


// Election Committees ---------------
function* getElectionCommittees({ payload: election }) {
  try {
    const response = yield call(getElectionCommitteesApi, election);
    yield put(
      ElectionApiResponseSuccess(GET_ELECTION_COMMITTEES, response.data)
    );
  } catch (error) {
    yield put(ElectionApiResponseError(GET_ELECTION_COMMITTEES, error));
  }
}

function* onAddNewElectionCommittee({ payload: electionCommittee }) {
  try {
    const response = yield call(addNewElectionCommittee, electionCommittee);
    yield put(addElectionCommitteeSuccess(response));
    toast.success("ElectionCommittee Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addElectionCommitteeFail(error));
    toast.error("ElectionCommittee Added Failed", { autoClose: 2000 });
  }
}

function* onDeleteElectionCommittee({ payload: electionCommittee }) {
  try {
    const response = yield call(deleteElectionCommittee, electionCommittee);
    yield put(
      deleteElectionCommitteeSuccess({ electionCommittee, ...response })
    );
    toast.success("ElectionCommittee Delete Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteElectionCommitteeFail(error));
    toast.error("ElectionCommittee Delete Failed", { autoClose: 2000 });
  }
}

function* onUpdateElectionCommittee({ payload: electionCommittee }) {
  try {
    const response = yield call(updateElectionCommittee, electionCommittee);
    yield put(updateElectionCommitteeSuccess(response));
    toast.success("ElectionCommittee Updated Successfully", {
      autoClose: 2000,
    });
  } catch (error) {
    yield put(updateElectionCommitteeFail(error));
    toast.error("ElectionCommittee Updated Failed", { autoClose: 2000 });
  }
}


function* onUpdateElectionCommitteeResults({ payload: electionCommitteeResults }) {
  try {
    const response = yield call(updateElectionCommitteeResults, electionCommitteeResults);
    yield put(
      ElectionApiResponseSuccess(UPDATE_ELECTION_COMMITTEE_RESULTS, response.data)
    );
  } catch (error) {
    yield put(ElectionApiResponseError(UPDATE_ELECTION_COMMITTEE_RESULTS, error));
  }
}


// Election Campaigns ---------------
function* getElectionCampaigns({ payload: election }) {
  try {
    const response = yield call(getElectionCampaignsApi, election);
    yield put(
      ElectionApiResponseSuccess(GET_ELECTION_CAMPAIGNS, response.data)
    );
  } catch (error) {
    yield put(ElectionApiResponseError(GET_ELECTION_CAMPAIGNS, error));
  }
}

function* onAddNewElectionCampaign({ payload: electionCampaign }) {
  try {
    const response = yield call(addNewElectionCampaign, electionCampaign);
    yield put(addElectionCampaignSuccess(response));
    toast.success("ElectionCampaign Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addElectionCampaignFail(error));
    toast.error("ElectionCampaign Added Failed", { autoClose: 2000 });
  }
}

function* onDeleteElectionCampaign({ payload: electionCampaign }) {
  try {
    const response = yield call(deleteElectionCampaign, electionCampaign);
    yield put(deleteElectionCampaignSuccess({ electionCampaign, ...response }));
    toast.success("ElectionCampaign Delete Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteElectionCampaignFail(error));
    toast.error("ElectionCampaign Delete Failed", { autoClose: 2000 });
  }
}

function* onUpdateElectionCampaign({ payload: electionCampaign }) {
  try {
    const response = yield call(updateElectionCampaign, electionCampaign);
    yield put(updateElectionCampaignSuccess(response));
    toast.success("ElectionCampaign Updated Successfully", {
      autoClose: 2000,
    });
  } catch (error) {
    yield put(updateElectionCampaignFail(error));
    toast.error("ElectionCampaign Updated Failed", { autoClose: 2000 });
  }
}



// Watchers ---------------
export function* watchGetElections() {
  yield takeEvery(GET_ELECTIONS, getElections);
}

export function* watchAddNewElection() {
  yield takeEvery(ADD_ELECTION, onAddElection);
}

export function* watchUpdateElection() {
  yield takeEvery(UPDATE_ELECTION, onUpdateElection);
}

export function* watchDeleteElection() {
  yield takeEvery(DELETE_ELECTION, onDeleteElection);
}

export function* watchGetElectionCount() {
  yield takeEvery(GET_ELECTION_COUNT, getElectionCount);
}

export function* watchGetElectionDetails() {
  yield takeEvery(GET_ELECTION_DETAILS, getElectionDetails);
}

// Election Candidates Watchers ---------------
export function* watchGetElectionCandidates() {
  yield takeEvery(GET_ELECTION_CANDIDATES, getElectionCandidates);
}

export function* watchAddNewElectionCandidate() {
  yield takeEvery(ADD_NEW_ELECTION_CANDIDATE, onAddNewElectionCandidate);
}

export function* watchUpdateElectionCandidate() {
  yield takeEvery(UPDATE_ELECTION_CANDIDATE, onUpdateElectionCandidate);
}

export function* watchDeleteElectionCandidate() {
  yield takeEvery(DELETE_ELECTION_CANDIDATE, onDeleteElectionCandidate);
}


// Election Committees Watchers ---------------
export function* watchGetElectionCommittees() {
  yield takeEvery(GET_ELECTION_COMMITTEES, getElectionCommittees);
}

export function* watchAddNewElectionCommittee() {
  yield takeEvery(ADD_NEW_ELECTION_COMMITTEE, onAddNewElectionCommittee);
}

export function* watchUpdateElectionCommittee() {
  yield takeEvery(UPDATE_ELECTION_COMMITTEE, onUpdateElectionCommittee);
}

export function* watchDeleteElectionCommittee() {
  yield takeEvery(DELETE_ELECTION_COMMITTEE, onDeleteElectionCommittee);
}

// Election Committees Results Watchers ---------------
export function* watchUpdateElectionCommitteeResults() {
  yield takeEvery(UPDATE_ELECTION_COMMITTEE_RESULTS, onUpdateElectionCommitteeResults);
}

// Election Campaigns Watchers ---------------
export function* watchGetElectionCampaigns() {
  yield takeEvery(GET_ELECTION_CAMPAIGNS, getElectionCampaigns);
}

export function* watchAddNewElectionCampaign() {
  yield takeEvery(ADD_NEW_ELECTION_CAMPAIGN, onAddNewElectionCampaign);
}

export function* watchUpdateElectionCampaign() {
  yield takeEvery(UPDATE_ELECTION_CAMPAIGN, onUpdateElectionCampaign);
}

export function* watchDeleteElectionCampaign() {
  yield takeEvery(DELETE_ELECTION_CAMPAIGN, onDeleteElectionCampaign);
}



function* electionSaga() {
  yield all([

    // Elections ---------------
    fork(watchGetElections),
    fork(watchGetElectionCount),
    fork(watchAddNewElection),
    fork(watchUpdateElection),
    fork(watchDeleteElection),
    fork(watchGetElectionDetails),
    fork(watchGetElectionCount),

    // ElectionCandidates ---------------
    fork(watchGetElectionCandidates),
    // fork(watchGetElectionCandidateDetails),
    // fork(watchGetElectionCandidateCount),
    fork(watchAddNewElectionCandidate),
    fork(watchUpdateElectionCandidate),
    fork(watchDeleteElectionCandidate),

    // ElectionCommittees ---------------
    fork(watchGetElectionCommittees),
    // fork(watchGetElectionCommitteeDetails),
    // fork(watchGetElectionCommitteeCount),
    fork(watchAddNewElectionCommittee),
    fork(watchUpdateElectionCommittee),
    fork(watchDeleteElectionCommittee),

    // ElectionCommitteeResults ---------------
    fork(watchUpdateElectionCommitteeResults),

    // ElectionCampiagns ---------------
    fork(watchGetElectionCampaigns),
    // fork(watchGetElectionCampiagnDetails),
    // fork(watchGetElectionCampiagnCount),
    fork(watchAddNewElectionCampaign),
    fork(watchUpdateElectionCampaign),
    fork(watchDeleteElectionCampaign),

  ]);
}

export default electionSaga;
