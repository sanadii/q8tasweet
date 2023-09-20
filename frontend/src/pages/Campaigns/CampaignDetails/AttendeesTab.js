// --------------- React, Redux & Store imports ---------------
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteElectionAttendee, updateElectionAttendee } from "../../../store/actions";
import { electionsSelector } from '../../../selectors/electionsSelector';

// Component imports
import { Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import { Loader, DeleteModal, TableContainer, TableContainerHeader, TableContainerFilter } from "../../../Components/Common";
import ElectionAttendeesModal from "./Modals/ElectionAttendeesModal";
import { GuaranteeStatusOptions } from "../../../Components/constants";
import useUserRoles from "../../../Components/Hooks/useUserRoles";

// Utility imports
import { toast, ToastContainer } from "react-toastify";

// CSS imports
import "react-toastify/dist/ReactToastify.css";

const AttendeesList = () => {
  const dispatch = useDispatch();

  const { electionId, electionAttendees, electionCommittees, campaignMembers, isElectionAttendeeSuccess, error  } = useSelector(electionsSelector);
  const { isAdmin, isSubscriber, isModerator, isParty, isCandidate, isSupervisor, isGuarantor, isAttendant, isSorter, isBelowSupervisor, isAttendantOrSorter } = useUserRoles();

  // ElectionAttendees Constants
  const [electionAttendee, setElectionAttendee] = useState(null);
  useState(electionAttendees);

  // Delete Modal Constants
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  // Delete Multiple Constants
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);


  // Delete Data
  const handleDeleteElectionAttendee = () => {
    if (electionAttendee) {
      dispatch(deleteElectionAttendee(electionAttendee.id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (electionAttendee) => {
    setElectionAttendee(electionAttendee);
    setDeleteModal(true);
  };

  // Modal Constants
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggle = useCallback(() => {
    setIsModalVisible(prev => !prev);
  }, []);

  const handleElectionAttendeeClick = useCallback(
    (arg, modalMode) => {
      const electionAttendee = arg;
      setElectionAttendee({
        id: electionAttendee.id,
        user: electionAttendee.user,
        civil: electionAttendee.civil,
        full_name: electionAttendee.full_name,
        box_no: electionAttendee.box_no,
        membership_no: electionAttendee.membership_no,
        enrollment_date: electionAttendee.enrollment_date,
        status: electionAttendee.status,
        notes: electionAttendee.notes,
      });

      // Set the modalMode state here
      setModalMode(modalMode);
      toggle();
    },
    [toggle]
  );

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const checkedEntry = document.querySelectorAll(".electionAttendeeCheckBox");

    if (checkall.checked) {
      checkedEntry.forEach((checkedEntry) => {
        checkedEntry.checked = true;
      });
    } else {
      checkedEntry.forEach((checkedEntry) => {
        checkedEntry.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(deleteElectionAttendee(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const checkedEntry = document.querySelectorAll(
      ".electionAttendeeCheckBox:checked"
    );
    checkedEntry.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(checkedEntry);
  };

  const [activeTab, setActiveTab] = useState("0");

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const getGenderIcon = (gender) => {
    if (gender === 2) {
      return <i className="mdi mdi-circle align-middle text-danger me-2"></i>;
    } else if (gender === 1) {
      return <i className="mdi mdi-circle align-middle text-info me-2"></i>;
    }
    return null;
  };

  const findUserById = useCallback((userId) => {
    const member = campaignMembers.find(
      (member) => member.user && member.user.id === userId
    );
    return member?.user?.name || "User not found";
  }, [campaignMembers]); // campaignMembers as dependency

  const findCommitteeById = useCallback((committeeId) => {
    const committee = electionCommittees.find(
      (committee) => committee && committee.id === committeeId
    );
    return committee?.name || "Committee not found";
  }, [electionCommittees]); // electionCommittees as dependency

  const columns = useMemo(() => [
      // {
      //   Header: (
      //     <input
      //       type="checkbox"
      //       id="checkBoxAll"
      //       className="form-check-input"
      //       onClick={() => checkedAll()}
      //     />
      //   ),
      //   Cell: (cellProps) => {
      //     return (
      //       <input
      //         type="checkbox"
      //         className="electionAttendeeCheckBox form-check-input"
      //         value={cellProps.row.original.id}
      //         onChange={() => deleteCheckbox()}
      //       />
      //     );
      //   },
      //   id: "#",
      // },
      {
        Header: "الاسم",
        Cell: (cellProps) => {
          return (
            <div>
              {getGenderIcon(cellProps.row.original.gender)}
              <b>{cellProps.row.original.full_name}</b>
              <br />
              {cellProps.row.original.civil}
            </div>
          );
        },
      },
      {
        Header: "اللجنة",
        accessor: "civil",
        Cell: (cellProps) => {
          const committeeId = cellProps.row.original.committee; // Directly access the user ID from original data
          const committeeName = findCommitteeById(committeeId);
          return <p>{committeeName}</p>;
        },
      },
      {
        Header: "الحضور",
        filterable: false,
        Cell: (cellProps) => {
          const userId = cellProps.row.original.user; // Directly access the user ID from original data
          const userName = findUserById(userId);
          return (
            <p className="text-info">
              <strong>{userName}</strong>
            </p>
          );
        },
      },

      // Only for Attendants
      {
        Header: "إجراءات",
        Cell: (cellProps) => {
          return (
            <div className="list-inline hstack gap-2 mb-0">
              <button
                to="#"
                className="btn btn-sm btn-soft-warning edit-list"
                onClick={() => {
                  const electionAttendee = cellProps.row.original;
                  handleElectionAttendeeClick(
                    electionAttendee,
                    "GuaranteeViewModal"
                  );
                }}
              >
                <i className="ri-eye-fill align-bottom" />
              </button>
              {(isAdmin || isAttendant) && (
                <>
                  <button
                    to="#"
                    className="btn btn-sm btn-soft-info edit-list"
                    onClick={() => {
                      const electionAttendee = cellProps.row.original;
                      handleElectionAttendeeClick(
                        electionAttendee,
                        "GuaranteeUpdateModal"
                      );
                    }}
                  >
                    <i className="ri-pencil-fill align-bottom" />
                  </button>
                  <button
                    to="#"
                    className="btn btn-sm btn-soft-danger remove-list"
                    onClick={() => {
                      const electionAttendee = cellProps.row.original;
                      onClickDelete(electionAttendee);
                    }}
                  >
                    <i className="ri-delete-bin-5-fill align-bottom" />
                  </button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    // [handleElectionAttendeeClick, checkedAll, findCommitteeById, findUserById, isAdmin, isAttendant]
    [handleElectionAttendeeClick, findCommitteeById, findUserById, isAdmin, isAttendant]
  );

  // Filters -------------------------
  const [filters, setFilters] = useState({
    global: "",
    gender: null,
    committee: null,
    member: null,
  });

  const electionAttendeeList = electionAttendees.filter(electionAttendee => {
    let isValid = true;
    if (filters.global) {
      const globalSearch = filters.global.toLowerCase();

      const nameIncludes = electionAttendee.full_name && typeof electionAttendee.full_name === 'string' && electionAttendee.full_name.toLowerCase().includes(globalSearch);
      const civilIncludes = electionAttendee.civil && typeof electionAttendee.civil === 'number' && String(electionAttendee.civil).includes(globalSearch);

      isValid = isValid && (nameIncludes || civilIncludes);
    }
    if (filters.gender !== null) {
      isValid = isValid && electionAttendee.gender === filters.gender;
    }
    if (filters.committee !== null) {
      isValid = isValid && electionAttendee.committee === filters.committee;
    }
    return isValid;
  });



  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteElectionAttendee}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />

      <ElectionAttendeesModal
        modal={isModalVisible}
        modalMode={modalMode}
        toggle={toggle}
        electionAttendee={electionAttendee}
      />
      <Row>
        <Col lg={12}>
          <Card id="memberList">
            <CardBody>
              <div>
                <TableContainerHeader
                  // Title
                  ContainerHeaderTitle="تحضير الناخبين"

                  // Add Elector Button
                  // isAddElectorButton={true}
                  // AddButtonText="Add New Guarantee"
                  // handleAddButtonClick={handleCampaignMemberClicks}
                  toggle={toggle}

                  // Delete Button
                  isMultiDeleteButton={isMultiDeleteButton}
                  setDeleteModalMulti={setDeleteModalMulti}
                />
                {electionAttendeeList ? (
                  <TableContainer
                    // Filters -------------------------
                    isTableContainerFilter={true}
                    isGenderFilter={true}
                    isCommitteeFilter={true}
                    isResetFilters={true}

                    // Settings
                    filters={filters}
                    setFilters={setFilters}

                    // Global Filters
                    isGlobalFilter={true}
                    preGlobalFilteredRows={true}
                    SearchPlaceholder="البحث بالاسم أو الرقم المدني..."
                    onTabChange={handleTabChange}

                    // Data -------------------------
                    columns={columns}
                    data={electionAttendeeList || []}
                    customPageSize={50}


                    // Styling -------------------------
                    className="custom-header-css"
                    divClass="table-responsive table-card mb-2"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light"
                  />
                ) : (
                  <Loader error={error} />
                )}
              </div>
              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AttendeesList;
