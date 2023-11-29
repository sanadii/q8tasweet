import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { campaignSelector, userSelector } from 'Selectors';
import { TableContainer } from 'components';
import { Card, CardHeader, CardBody, Button, Row, Col } from "reactstrap";

const SortingTab = ({ socket }) => {
  const { campaign, campaignElectionCandidates, currentCampaignMember } = useSelector(campaignSelector);
  const { userId } = useSelector(userSelector);

  // Logic committee is not set by the campaign Moderators
  const committeeId = currentCampaignMember.committee;
  const campaignSlug = campaign.slug;
  const [candidatesSorting, setCandidatesSorting] = useState([]);


  // Initialize candidatesSorting state and WebSocket
  useEffect(() => {
    const initialSortingData = campaignElectionCandidates.map(candidate => ({
      candidateId: candidate.id,
      name: candidate.name,
      committeeVote: candidate.committeeSorting.find(cs => cs.electionCommittee === committeeId)?.votes || 0
    }));
    setCandidatesSorting(initialSortingData);
  }, [campaignElectionCandidates]);


  const updateSortingVoteState = (candidateId, newVotes) => {
    setCandidatesSorting(prevSorting => prevSorting.map(sortItem => {
      if (sortItem.candidateId === candidateId) {
        return { ...sortItem, committeeVote: newVotes };
      }
      return sortItem;
    }));
  };


  const sendSortingVotesUpdate = (candidateId, newVotes) => {
    if (socket) {
      socket.send(JSON.stringify({
        type: 'vote_update',
        electionCandidateId: candidateId,
        electionCommitteeId: committeeId,
        votes: newVotes
      }));
      updateSortingVoteState(candidateId, newVotes); // Immediate state update for better UX
    }
  };


  const crementingVotes = (candidateId, increment) => {
    const candidate = candidatesSorting.find(c => c.candidateId === candidateId);
    if (candidate) {
      const newVotes = increment ? candidate.committeeVote + 1 : Math.max(0, candidate.committeeVote - 1);
      updateSortingVoteState(candidateId, newVotes); // Immediate state update
      sendSortingVotesUpdate(candidateId, newVotes); // Send WebSocket message
    } else {
      console.error(`Candidate with ID ${candidateId} not found in candidatesSorting state`);
    }
  };

  const incrementVotes = candidateId => crementingVotes(candidateId, true);
  const decrementVotes = candidateId => crementingVotes(candidateId, false);

  // Define columns for the table
  const columns = useMemo(() => {
    return [
      {
        Header: 'candidateId',
        Cell: ({ row }) => <span style={{ whiteSpace: 'nowrap' }}>{row.original.candidateId}</span>,
      }, {
        Header: 'اسم المرشح',
        Cell: ({ row }) => <span style={{ whiteSpace: 'nowrap' }}>{row.original.name}</span>,
      },
      {
        Header: 'الأصوات',
        Cell: ({ row }) => {
          return (
            <>
              <Button color="success" className="btn-icon" outline onClick={() => incrementVotes(row.original.candidateId)}>
                <i className="ri-add-line" />
              </Button>
              {' '}
              <span style={{ margin: '0 10px', display: 'inline-block', width: '30px', textAlign: 'center' }}>
                {row.original.committeeVote}
              </span>
              {' '}
              <Button color="danger" className="btn-icon" outline onClick={() => decrementVotes(row.original.candidateId)}>
                <i className="ri-subtract-line" />
              </Button>
            </>
          );
        },
      },
      {
        Header: 'إجراءات',
        Cell: () => (
          <>
            <button className="btn btn-sm btn-soft-warning edit-list me-2">
              <i className="ri-eye-fill align-bottom pe-2" /> تعديل
            </button>
            <button className="btn btn-sm btn-soft-info edit-list me-2">
              <i className="ri-pencil-fill align-bottom pe-2" /> ملاحضات
            </button>
          </>
        ),
      },
    ];
  }, [incrementVotes, decrementVotes]); // Add dependencies to useMemo


  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader><h4><b>الفرز</b></h4></CardHeader>
            <CardBody>
              <TableContainer
                columns={columns}
                data={candidatesSorting}
                customPageSize={50}
                divClass="table-responsive table-card mb-3"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SortingTab;
