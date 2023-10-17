import React from "react";

const Id = (cellProps) => {
    return (
        <React.Fragment>
            {cellProps.row.original.id}
        </React.Fragment>
    );
};

const Name = (cellProps) => {
    return (
        <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
            </div>
            <div className="flex-grow-1 ms-2 name">
                {cellProps.row.original.fullName}{" "}
                {cellProps.row.original.status}
            </div>
        </div>

    );
};

const Role = ({ cellProps, campaignRoles }) => {
    const roleId = cellProps.row.original.role;
    const role = campaignRoles.find((option) => option.id === roleId);

    return (
        <p className="text-success">
            <strong>{role ? role.name : "غير معرف"}</strong>
        </p>
    );
}

const Team = ({ cellProps, campaignMembers }) => {
    const memberId = cellProps.row.original.id;
    const teamCountForMember = campaignMembers.filter(member => member.supervisor === memberId).length;

    return (
        <p>{teamCountForMember}</p>
    );
};

const Guarantees = ({ cellProps, campaignGuarantees }) => {
    const memberId = cellProps.row.original.id;
    const guaranteeCountForMember = campaignGuarantees.filter(guarantee => guarantee.member === memberId).length;

    return (
        <p>{guaranteeCountForMember}</p>
    );
};

const Attendees = ({ cellProps, campaignAttendees }) => {
    const userId = cellProps.row.original.user;
    const attendeeCountForMember = campaignAttendees.filter(attendee => attendee.member === userId).length;

    return (
        <p>{attendeeCountForMember}</p>
    );
};

const Sorted = ({ cellProps, campaignMembers }) => {
    return (
        <p>Sorted</p>
    );

}

const Committee = ({ cellProps, campaignElectionCommittees }) => {
    const committeeId = cellProps.row.original.committee;

    if (committeeId === null) {
        return (
            <p className="text-danger">
                <strong>N/A</strong>
            </p>
        );
    }

    const committee = campaignElectionCommittees.find(
        (committee) => committee.id === committeeId
    );
    return (
        <p className="text-success">
            <strong>{committee ? committee.name : "Not Found"}</strong>
        </p>
    );
};

const Supervisor = ({ cellProps, campaignMembers }) => {

    const supervisorId = cellProps.row.original.supervisor;
    if (supervisorId === null) {
        return (
            <p className="text-danger">
                <strong>N/A</strong>
            </p>
        );
    }

    const supervisor = campaignMembers.find(
        (member) => member.id === supervisorId
    );
    return (
        <p className="text-success">
            <strong>
                {supervisor ? supervisor.fullName : "Not Found"}
            </strong>
        </p>
    );
};

const Actions = (props) => {
    const { cellProps, handleCampaignMemberClick, onClickDelete, canChangeConfigs } = props;

    return (
        <div className="list-inline hstack gap-2 mb-0">
            <button
                to="#"
                className="btn btn-sm btn-soft-warning edit-list"
                onClick={() => {
                    const campaignMember = cellProps.row.original;
                    handleCampaignMemberClick(campaignMember, "ViewModal");
                }}
            >
                <i className="ri-eye-fill align-bottom" />
            </button>
            <>
                <button
                    to="#"
                    className="btn btn-sm btn-soft-info edit-list"
                    onClick={() => {
                        const campaignMember = cellProps.row.original;
                        handleCampaignMemberClick(campaignMember, "UpdateModal");
                    }}
                >
                    <i className="ri-pencil-fill align-bottom" />
                </button>
                {canChangeConfigs && (

                    <button
                        to="#"
                        className="btn btn-sm btn-soft-danger remove-list"
                        onClick={() => {
                            const campaignMember = cellProps.row.original;
                            onClickDelete(campaignMember);
                        }}
                    >
                        <i className="ri-delete-bin-5-fill align-bottom" />
                    </button>
                )}

            </>
        </div>
    );
};

export {
    Id,
    Name,
    Role,
    Team,
    Guarantees,
    Attendees,
    Sorted,
    Committee,
    Supervisor,
    Actions,

};
