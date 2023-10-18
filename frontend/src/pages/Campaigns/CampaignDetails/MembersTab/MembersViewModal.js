import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, ModalBody } from "reactstrap";

const MembersViewModal = ({ campaignMember }) => {

  const displayField = (label, value) => {
    if (!value) return null;

    return (
      <Row className="mb-2">
        <Col lg={3} className="align-self-center font-weight-bold">{label}</Col>
        <Col lg={9}>{value}</Col>
      </Row>
    );
  };

  return (
    <div>
      <ModalBody className="vstack gap-3">
        <Row>
          <h4>
            <strong>
              [{campaignMember?.id}] {campaignMember?.name}
            </strong>
          </h4>
        </Row>

        {displayField("Role", campaignMember?.role)}
        {displayField("Mobile", campaignMember?.phone)}
        {/* {campaignMember?.role > 3 && displayField("Supervisor", supervisorMembers.find(supervisor => supervisor.id === campaignMember.supervisor)?.user?.name)}
        {campaignMember?.role > 4 && displayField("Committee", campaignElectionCommittees.find(committee => committee.id === campaignMember.committee)?.name)} */}
        {displayField("Notes", campaignMember?.notes)}
      </ModalBody>
    </div>
  );
};

export default MembersViewModal;
