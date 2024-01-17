import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { updateElectionResults, updateElectionPartyResults, updateElectionPartyCandidateResults } from "store/actions";


// CommitteeVoteButton is responsible for rendering a button with different texts and classes
// based on whether the committee is being edited or has changes.
// Used Directly in the table columns as a Header

const HeaderVoteButton = ({
  committee,
  committeeId,
  columnEdited,
  hasChanges,
  handleSaveResults,
  toggleColumnToEdit,
}) => {

  // Determine the button text and class based on the editing state
  const buttonText = columnEdited[committeeId] ? (hasChanges[committeeId] ? 'حفظ' : 'اغلاق') : (committee ? committee.name : `تعديل`);
  const buttonClass = columnEdited[committeeId] ? (hasChanges[committeeId] ? 'btn-success' : 'btn-danger') : 'btn-info';

  const handleClick = () => {
    if (hasChanges[committeeId]) {
      console.log("It should handleSaveResults Results here")
      handleSaveResults(committeeId);
    }
    console.log("It should toggleColumnToEdit Results here")

    toggleColumnToEdit(committeeId);
  };

  return (
    <button onClick={handleClick} className={`btn btn-sm ml-2 ${buttonClass}`}>
      {buttonText}
    </button>
  );
};


// ResultInputField is a controlled component for vote input that localizes its state and synchronizes it with the parent component's state onBlur.
const ResultInputField = ({ candidateId, committeeId, value, onChange }) => {
  const [localVotes, setLocalVotes] = useState(value);

  useEffect(() => {
    setLocalVotes(value);
  }, [value]);

  const handleBlur = () => {
    // If committeeId is provided, use it alongside candidateId to call onChange
    if (committeeId) {
      onChange(localVotes);
    }

  };

  return (
    <input
      key={`${candidateId}-${committeeId}`}
      type="number"
      maxLength="5"
      pattern="\d*"
      style={{ width: "5em" }}
      value={localVotes}
      onChange={(e) => setLocalVotes(e.target.value)}
      onBlur={handleBlur}
    />
  );
};


// calculateTotalVotes is a utility function to sum up the votes for a candidate across all committees.
const calculateTotalVotes = (candidate, electionCommittees) => {
  return electionCommittees.reduce((total, committee) => {
    const committeeVote = candidate.committeeVotes?.find(v => v.electionCommittee === committee.id);
    return total + (committeeVote?.votes || 0);
  }, 0);
};


// transformResultData takes the raw election data and transforms it into a structure suitable for rendering by the frontend,
// including calculating the total votes and candidate positions.
const transformResultData = (
  electionCandidates,
  electionCommittees,
  columnEdited,
  handleVoteFieldChange,
  election
) => {
  if (!electionCandidates || !electionCommittees || !election) return [];

  const candidatesWithTotalVotes = electionCandidates.map((candidate) => {
    const candidateVotes = candidate.votes ?? 0;
    const transformedResultFieldsData = {
      'candidate.id': candidate.id,
      position: candidate.position,
      electionParty: candidate.electionParty,
      name: candidate.name,
      gender: candidate.gender,
      image: candidate.imagePath,
      isWinner: candidate.isWinner,
      total: calculateTotalVotes(candidate, electionCommittees),
    };

    // Candidate Vote Field
    const noCommittee = "0";
    transformedResultFieldsData[`votes`] = columnEdited[0]
      ? <ResultInputField
        committeeId={noCommittee}
        candidateId={candidate.id}
        value={candidateVotes}
        onChange={(value) => handleVoteFieldChange(noCommittee, candidate.id, value)}
      />
      : candidateVotes;

    // Committee Candidate Vote Field
    if (electionCommittees.length > 0) {
      electionCommittees.forEach(committee => {
        const committeeVote = candidate.committeeVotes?.find(v => v.electionCommittee === committee.id);
        const votes = columnEdited[committee.id]?.[candidate.id] ?? committeeVote?.votes ?? 0;
        transformedResultFieldsData[`committee_${committee.id}`] = columnEdited[committee.id]
          ? <ResultInputField
            committeeId={committee.id}
            candidateId={candidate.id}
            value={votes}
            onChange={(value) => handleVoteFieldChange(committee.id, candidate.id, value)}
          />
          : votes;
      });
    }
    return transformedResultFieldsData;
  });

  // Calculate positions and determine winners, but do not sort by position
  const calculateCandidatePosition = (candidates) => {
    const sortedCandidates = [...candidates].sort((a, b) => b.total - a.total);
    sortedCandidates.forEach((candidate, index) => {
      candidate.position = index + 1;
      candidate.isWinner = candidate.position <= (election.electSeats || 0);
    });
    return candidates; // Return the original list without sorting by position
  };

  return calculateCandidatePosition(candidatesWithTotalVotes);
};

// useSaveCommitteeResults is a custom hook that dispatches an action to save committee results and handles local state updates related to editing.
const useSaveCommitteeResults = (
  voteFieldEditedData,
  columnEdited,
  setColumnEdited,
  setVoteFieldEditedData,
  toggleColumnToEdit,
  electionMethod,
) => {
  const dispatch = useDispatch();

  return useCallback((committeeId) => {
    if (committeeId) {
      const updatedResults = {
        id: committeeId,
        data: voteFieldEditedData[committeeId]
      };

      (electionMethod !== "candidateOnly" ?
        dispatch(updateElectionPartyResults(updatedResults))
        :
        dispatch(updateElectionResults(updatedResults)));


      // Reset edited data for this specific committee
      const updatededitedCommittee = { ...columnEdited };
      delete updatededitedCommittee[committeeId];
      setColumnEdited(updatededitedCommittee);

      // Reset the modified data for this committee if needed
      const updatedModifiedData = { ...voteFieldEditedData };
      delete updatedModifiedData[committeeId];
      setVoteFieldEditedData(updatedModifiedData);
    }

    // Toggle edit mode off immediately, don’t wait for the action to complete
    toggleColumnToEdit(committeeId);

  }, [
    voteFieldEditedData,
    dispatch,
    columnEdited,
    setColumnEdited,
    setVoteFieldEditedData,
    toggleColumnToEdit
  ]);
};


export {
  HeaderVoteButton,
  ResultInputField,
  useSaveCommitteeResults,
  transformResultData,
}