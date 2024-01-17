// React imports
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Loader, TableContainer, ImageCandidateWinnerCircle } from "components";

// Store & Selectors
import { electionSelector } from 'Selectors';

// UI & Utilities
import { Button, Spinner, Card, CardHeader, CardBody } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import { useWebSocketContext } from 'utils/WebSocketContext';


const sortingStatus = () => {

  return (
    <span>
      <Spinner size="sm" color="success" className="flex-shrink-0"> الفرز... </Spinner>
      <span className="flex-grow-1 ms-2 text-success">
        عملية الفرز جارية...
      </span>
    </span>
  )
}

// تم اغلاق الصناديق
// بدأ عملية الفرز
// انتهاء عملية الفرز
// بانتظار النتائج النهائية الرسمية

const ElectionResults = () => {

  // States & Constants
  const { election, electionCandidates, electionPartyCandidates, electionCommittees, error } = useSelector(electionSelector);
  const [showDetailedResults, setShowDetailedResults] = useState(false);
  const [candidatesResult, setCandidatesResult] = useState([]);
  const [electionResultStatus, setElectionResultStatus] = useState("");

  // candidates based on election Type
  const candidates = election.electionMethod !== "candidateOnly" ? electionPartyCandidates : electionCandidates;

  const electionResult = election.electionResult;
  const electionSeats = election.electSeats;
  const calculateTotalVotes = useCallback((committeeResults) => {
    return Object.values(committeeResults).reduce((sum, currentVotes) => sum + currentVotes, 0);
  }, []);

  const sortAndUpdatePositions = (candidates) => {
    const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
    sortedCandidates.forEach((candidate, index) => {
      candidate.position = index + 1;
      candidate.isWinner = index < electionSeats;
    });

    return sortedCandidates;
  };

  // Initialize candidatesResult state and WebSocket
  const calculateCommitteeResults = useCallback((candidate, electionResult) => {
    const committeeResult = {};
    let totalVotes = 0;
    let electionMethodResults;
    let electionResultStatus;

    if (electionResult === 1 && candidate.votes) {
      totalVotes = candidate.votes;
      electionResultStatus = "نتائج نهائية"

    } else {
      // determine electionMethodResults based on electionResult
      if (electionResult === 2 && candidate.committeeVotes) {
        electionMethodResults = candidate.committeeVotes;
        electionResultStatus = "نتائج نهائية"
      } else if (electionResult === 3 && candidate.committeeSorting) {
        electionMethodResults = candidate.committeeSorting;
        electionResultStatus = sortingStatus

      }

      electionCommittees.forEach(committee => {
        const votes = electionMethodResults ?
          electionMethodResults.find(cs => cs.electionCommittee === committee.id)?.votes || 0 : 0;
        committeeResult[committee.id] = votes;
      });

      totalVotes = calculateTotalVotes(committeeResult);
    }

    return { committeeResult, totalVotes, electionResultStatus };
  }, [electionCommittees, calculateTotalVotes]);

  useEffect(() => {
    const initialSortingData = candidates.map(candidate => {
      const { committeeResult, totalVotes, electionResultStatus } = calculateCommitteeResults(candidate, electionResult);
      // Use the first status as the default for the entire election
      setElectionResultStatus(electionResultStatus);

      return {
        candidateId: candidate.id,
        name: candidate.name,
        gender: candidate.gender,
        image: candidate.image,
        isWinner: candidate.isWinner,
        committeeResult,
        votes: totalVotes
      };
    });

    // Use sortAndUpdatePositions and pass electionSeats from the election object
    const sortedCandidates = sortAndUpdatePositions(initialSortingData, electionSeats);
    setCandidatesResult(sortedCandidates);
  }, [candidates, electionCommittees, election.electionResult, electionSeats]);


  const updateSortingVotes = (candidateId, newVotes, committeeId) => {
    setCandidatesResult(prevSorting => {
      const updatedSorting = prevSorting.map(candidate => {
        if (candidate.candidateId === candidateId) {
          // Update only the votes of the specific committee
          const updatedCommitteeVotes = { ...candidate.committeeResult, [committeeId]: newVotes };
          // Recalculate the total votes
          const totalVotes = Object.values(updatedCommitteeVotes).reduce((sum, currVotes) => sum + currVotes, 0);
          return { ...candidate, committeeResult: updatedCommitteeVotes, votes: totalVotes };
        }
        return candidate;
      });
      return sortAndUpdatePositions(updatedSorting);
    });
  };


  // Update the votes from electionSorting Socket
  const { sendMessage, readyState, messageHistory } = useWebSocketContext();

  const electioSortingHistory = messageHistory.electionSorting || [];

  useEffect(() => {
    // Access and process each object within the array
    electioSortingHistory.forEach(data => {
      const { electionCandidateId, votes, electionCommitteeId } = data;
      updateSortingVotes(electionCandidateId, votes, electionCommitteeId);
    });
  }, [candidates, electioSortingHistory, updateSortingVotes]);


  const toggleDetailedResults = () => {
    setShowDetailedResults((prev) => !prev);
  };


  const columns = useMemo(() => {
    const baseColumns = [
      {
        Header: "المركز",
        accessor: "position",
        Cell: (cellProps) => <strong>{cellProps.row.original.position}</strong>,
      },
      {
        Header: "المرشح",
        filterable: true,
        Cell: (cellProps) =>
          <ImageCandidateWinnerCircle
            gender={cellProps.row.original.gender}
            name={cellProps.row.original.name}
            imagePath={cellProps.row.original.image}
            isWinner={cellProps.row.original.isWinner}
          />,
      },
      {
        Header: 'المجموع',
        accessor: "votes",
        Cell: (cellProps) => <strong className="text-success">{cellProps.row.original.votes}</strong>,
      },
    ];

    if (showDetailedResults) {
      electionCommittees.forEach((committee) => {
        baseColumns.push({
          Header: committee.name,
          accessor: (row) => {
            // For Sorting Results
            const committeeVote = row.committeeResult[committee.id];
            return committeeVote || 0;

          },
          Cell: (cellProps) => <strong>{cellProps.value}</strong>,
        });
      });
    }

    return baseColumns;
  }, [showDetailedResults, electionCommittees]);

  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <div className="align-items-center d-flex">
            <h5 className="mb-0 flex-grow-1"><strong>المرشحين والنتائج</strong> - {electionResultStatus}</h5>
            <div className="flex-shrink-0">
              {
                (electionResult === 2 || electionResult === 3) &&
                <button
                  type="button"
                  className="btn btn-soft-danger btn-md"
                  onClick={toggleDetailedResults}
                >
                  {(showDetailedResults ? 'إخفاء النتائج التفصيلية' : 'عرض النتائج التفصيلية')}
                </button>
              }
            </div>
          </div>
        </CardHeader>
        <CardBody>



          {candidatesResult && candidatesResult.length ? (
            <TableContainer
              // Data
              columns={columns}
              data={candidatesResult || []}
              customPageSize={50}

              // Sorting
              sortBy="position"

              // Styling
              divClass="table-responsive table-card mb-3"
              tableClass="align-middle table-nowrap mb-0"
              theadClass="table-light table-nowrap"
              thClass="table-light text-muted"
            />
          ) : (
            <Loader error={error} />
          )}
          <ToastContainer closeButton={false} limit={1} />
        </CardBody>
      </Card>

    </React.Fragment >
  );
};

export default ElectionResults;
