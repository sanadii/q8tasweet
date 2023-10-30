import { call, put, takeEvery, all, fork, take } from "redux-saga/effects";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Election Redux States
import {
  GET_ELECTIONS,
  GET_ELECTION_DETAILS,
  ADD_ELECTION,
  DELETE_ELECTION,
  UPDATE_ELECTION,

  // Election Candidates
  GET_ELECTION_CANDIDATES,
  ADD_NEW_ELECTION_CANDIDATE,
  DELETE_ELECTION_CANDIDATE,
  UPDATE_ELECTION_CANDIDATE,

  // Election Committees
  GET_ELECTION_COMMITTEES,
  ADD_NEW_ELECTION_COMMITTEE,
  DELETE_ELECTION_COMMITTEE,
  UPDATE_ELECTION_COMMITTEE,

  // Election Committee Results
  UPDATE_ELECTION_COMMITTEE_RESULTS,

  // Election Campaign
  GET_ELECTION_CAMPAIGNS,
  ADD_NEW_ELECTION_CAMPAIGN,
  DELETE_ELECTION_CAMPAIGN,
  UPDATE_ELECTION_CAMPAIGN,
} from "./actionType";

import {
  // getElections, getElectionDetails, 
  // API Response
  ElectionApiResponseSuccess,
  ElectionApiResponseError,

  // Elections
  addElectionSuccess,
  addElectionFail,
  updateElectionSuccess,
  updateElectionFail,
  deleteElectionSuccess,
  deleteElectionFail,

  // Election Candidates
  addElectionCandidateSuccess,
  addElectionCandidateFail,
  updateElectionCandidateSuccess,
  updateElectionCandidateFail,
  deleteElectionCandidateSuccess,
  deleteElectionCandidateFail,

  // Election Committees
  addElectionCommitteeSuccess,
  addElectionCommitteeFail,
  updateElectionCommitteeSuccess,
  updateElectionCommitteeFail,
  deleteElectionCommitteeSuccess,
  deleteElectionCommitteeFail,

  // Election Committees Results
  updateElectionCommitteeResultsSuccess,
  updateElectionCommitteeResultsFail,

  // Election Campaigns
  addElectionCampaignSuccess,
  addElectionCampaignFail,
  updateElectionCampaignSuccess,
  updateElectionCampaignFail,
  deleteElectionCampaignSuccess,
  deleteElectionCampaignFail,

} from "./action";

//Include Both Helper File with needed methods
import {
  // Elections
  getElections as getElectionsApi,
  getElectionDetails as getElectionDetailsApi,
  addElection,
  updateElection,
  deleteElection,

  // Election Candidates
  getElectionCandidates as getElectionCandidatesApi,
  addNewElectionCandidate,
  updateElectionCandidate,
  deleteElectionCandidate,

  // Election Committees
  getElectionCommittees as getElectionCommitteesApi,
  addNewElectionCommittee,
  updateElectionCommittee,
  deleteElectionCommittee,

  // Election Committee Results
  updateElectionCommitteeResults,

  // Election Campaigns
  getElectionCampaigns as getElectionCampaignsApi,
  addNewElectionCampaign,
  updateElectionCampaign,
  deleteElectionCampaign,
} from "../../helpers/backend_helper";

function* getElections() {
  try {
    const response = yield call(getElectionsApi);
    yield put(ElectionApiResponseSuccess(GET_ELECTIONS, response.data));
  } catch (error) {
    yield put(ElectionApiResponseError(GET_ELECTIONS, error));
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

function* onAddElection({ payload: election }) {
  try {
    const response = yield call(addElection, election);
    yield put(addElectionSuccess(response));
    toast.success("تم إضافة الإنتخابات بنجاح", { autoClose: 2000 });
  } catch (error) {
    yield put(addElectionFail(error));
    toast.error("خطأ في إضافة الإنتخابات", { autoClose: 2000 });
  }
}

function* onUpdateElection({ payload: election }) {
  try {
    // Log that the onUpdateElection saga has started
    console.log("onUpdateElection saga started");

    // Make an API call to update the election
    const response = yield call(updateElection, election);

    // Log the successful API response
    console.log("API response:", response);

    // Dispatch the updateElectionSuccess action
    yield put(updateElectionSuccess(response));

    // Log a success message
    console.log("Election updated successfully");

    // Display a success toast message
    toast.success("تم تحديث الإنتخابات بنجاح", { autoClose: 2000 });
  } catch (error) {
    // Log that an error occurred in the saga
    console.error("Error in onUpdateElection saga:", error);

    // Dispatch the updateElectionFail action with the error
    yield put(updateElectionFail(error));

    // Log an error message
    console.log("Error updating election:", error);

    // Display an error toast message
    toast.error("خطأ في تحديث الإنتخابات", { autoClose: 2000 });
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

// Election Candidates
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


// Election Committees
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


function* onUpdateElectionCommitteeResults({ payload: electionCommitteeResult }) {
  try {
    const response = yield call(updateElectionCommitteeResults, electionCommitteeResult);
    yield put(updateElectionCommitteeResultsSuccess(response));
    toast.success("تم تحديث النتائج بنجاح", {
      autoClose: 2000,
    });
  } catch (error) {
    console.error('Saga Error:', error); // Log any error that occurs
    yield put(updateElectionCommitteeResultsFail(error));
    toast.error("خطأ في تحديث النتائج", { autoClose: 2000 });
  }
}

// Election Campaigns
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



// Watchers
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


export function* watchGetElectionDetails() {
  yield takeEvery(GET_ELECTION_DETAILS, getElectionDetails);
}

// Election Candidates Watchers
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


// Election Committees Watchers
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

// Election Committees Results Watchers
export function* watchUpdateElectionCommitteeResults() {
  yield takeEvery(UPDATE_ELECTION_COMMITTEE_RESULTS, onUpdateElectionCommitteeResults);
}

// Election Campaigns Watchers
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

    // Elections
    fork(watchGetElections),
    fork(watchAddNewElection),
    fork(watchUpdateElection),
    fork(watchDeleteElection),
    fork(watchGetElectionDetails),

    // ElectionCandidates
    fork(watchGetElectionCandidates),
    fork(watchAddNewElectionCandidate),
    fork(watchUpdateElectionCandidate),
    fork(watchDeleteElectionCandidate),

    // ElectionCommittees
    fork(watchGetElectionCommittees),
    fork(watchAddNewElectionCommittee),
    fork(watchUpdateElectionCommittee),
    fork(watchDeleteElectionCommittee),

    // ElectionCommitteeResults
    fork(watchUpdateElectionCommitteeResults),

    // ElectionCampiagns
    fork(watchGetElectionCampaigns),
    fork(watchAddNewElectionCampaign),
    fork(watchUpdateElectionCampaign),
    fork(watchDeleteElectionCampaign),
  ]);
}

export default electionSaga;
