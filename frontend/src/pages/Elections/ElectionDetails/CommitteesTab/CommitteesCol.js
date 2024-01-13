import React from "react";
import { ImageCandidateWinnerCircle } from "components";


const Id = (cellProps) => {
    return (
        <React.Fragment>
            {cellProps.row.original.id}
        </React.Fragment>
    );
};

const CheckboxHeader = ({ checkedAll }) => (
    <input
        type="checkbox"
        id="checkBoxAll"
        className="form-check-input"
        onClick={checkedAll}
    />
);

const CheckboxCell = ({ row, deleteCheckbox }) => (
    <input
        type="checkbox"
        className="checkboxSelector form-check-input"
        value={row.original.id}
        onChange={deleteCheckbox}
    />
);

const Position = (cellProps) => {
    return <p>{cellProps.row.original.position}</p>;
}

const Name = ({ row }) => {
    return (
        <p>
            {row.original.name}
        </p>
    );
};

const Gender = ({ row }) => {
    return (
        <p>
            {row.original.gender}
        </p>
    );
};

const Sorter = (cellProps) => {
    return (
        <p>
            {cellProps.row.original.sorter?.fullName}
            <span>- {cellProps.row.original.sorter?.id}</span>
        </p>
    );
};

const Votes = (cellProps) => {
    return <p>{cellProps.row.original.votes}</p>;
}

const Actions = (cellProps) => {
    const { setElectionCommittee, handleElectionCommitteeClick, onClickDelete } = cellProps;
    const electionCommittee = cellProps.row.original;

    return (
        <div className="list-inline hstack gap-2 mb-0">
            <button
                to="#"
                className="btn btn-sm btn-soft-warning edit-list"
                onClick={() => {
                    setElectionCommittee(electionCommittee);
                }}
            >
                <i className="ri-eye-fill align-bottom" />
            </button>
            <button
                to="#"
                className="btn btn-sm btn-soft-info edit-list"
                onClick={() => {
                    handleElectionCommitteeClick(electionCommittee);
                }}
            >
                <i className="ri-pencil-fill align-bottom" />
            </button>
            <button
                to="#"
                className="btn btn-sm btn-soft-danger remove-list"
                onClick={() => {
                    onClickDelete(electionCommittee);
                }}
            >
                <i className="ri-delete-bin-5-fill align-bottom" />
            </button>
        </div>
    );

};

export {
    Id,
    CheckboxHeader,
    CheckboxCell,
    Votes,
    Name,
    Gender,
    Sorter,
    Position,
    Actions,
};
