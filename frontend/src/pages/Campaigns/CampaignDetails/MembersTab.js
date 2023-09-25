// --------------- React, Redux & Store imports ---------------
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCampaignMember } from "../../../store/actions";
import { electionsSelector } from '../../../Selectors/electionsSelector';

// --------------- Component & Constants imports ---------------
import { ImageCircle, Loader, DeleteModal, TableContainer, TableContainerHeader } from "../../../Components/Common";
import { MemberRankOptions, MemberStatusOptions } from "../../../Components/constants";
import CampaignMembersModal from "./Modals/CampaignMembersModal";
import useUserRoles from "../../../Components/Hooks/useUserRoles";

// --------------- Utility imports ---------------
import { Col, Row, Card, CardBody, CardHeader, CardFooter } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MembersTab = () => {
  const dispatch = useDispatch();

  // --------------- States ---------------
  const { currentCampaignMember, campaignGuarantees, campaignMembers, campaignCommittees, electionsSelector, isCampaignMemberSuccess, error } = useSelector(electionsSelector);
  const { isAdmin, isSubscriber, isModerator, isParty, isCandidate, isSupervisor, isGuarantor, isAttendant, isSorter, isBelowSupervisor, isAttendantOrSorter } = useUserRoles();

  // --------------- Constants ---------------
  const [campaignMember, setCampaignMember] = useState([]);
  // const [campaignMemberList, setCampaignMemberList] = useState(campaignMembers);

  // useEffect(() => {
  //   setCampaignMemberList(campaignMembers);
  // }, [campaignMembers]);

  const [isEdit, setIsEdit] = useState(false);

  //Delete Election Member
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);



  // Delete Data
  const handleDeleteCampaignMember = () => {
    if (campaignMember) {
      dispatch(deleteCampaignMember(campaignMember.id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (campaignMember) => {
    setCampaignMember(campaignMember);
    setDeleteModal(true);
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const checkedEntry = document.querySelectorAll(".campaignMemberCheckBox");

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

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(deleteCampaignMember(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const checkedEntry = document.querySelectorAll(".campaignMemberCheckBox:checked"
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


  // Modal Constants
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Toggle
  const toggle = useCallback(() => {
    setIsModalVisible(prevIsModalVisible => !prevIsModalVisible);
}, []);

  const handleCampaignMemberClicks = () => {
    setCampaignMember("");
    setModalMode("AddModal");
    toggle();
  };

  const getGuaranteeCountForMember = useCallback((memberId) => {
    return campaignGuarantees.filter(guarantee => guarantee.member === memberId).length;
}, [campaignGuarantees]);

const getAttendeeCountForMember = useCallback((memberId) => {
    return electionsSelector.filter(attendee => attendee.member === memberId).length;
}, [electionsSelector]);


  const handleCampaignMemberClick = useCallback(
    (arg, modalMode) => {
      const campaignMember = arg;

      setCampaignMember({
        id: campaignMember.id,
        campaignId: campaignMember.campaign,
        userId: campaignMember.user.id,
        name: campaignMember.user.name,
        rank: campaignMember.rank,
        supervisor: campaignMember.supervisor,
        committee: campaignMember.committee,
        mobile: campaignMember.mobile,
        notes: campaignMember.notes,
        status: campaignMember.status,
      });
      // Set the modalMode state here
      setModalMode(modalMode);
      toggle();
    },
    [toggle]
  );


  // Columns -------------------------
  const columns = useMemo(() => {
    const checkColumn = [
      {
        Header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        Cell: (cellProps) => {
          return (
            <input
              type="checkbox"
              className="campaignMemberCheckBox form-check-input"
              value={cellProps.row.original.id}
              onChange={() => deleteCheckbox()}
            />
          );
        },
        id: "#",
      }
    ];
    const memberColumn = [
      {
        Header: "م.",
        Cell: (cellProps) => {
          return <p> {cellProps.row.original.id}</p>;
        },
      },
      {
        Header: "العضو",
        accessor: "user.name",
        Cell: (campaignMember) => (
          <>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                {campaignMember.row.original.user.image ? (
                  // Use the ImageCircle component here
                  <ImageCircle
                    imagePath={campaignMember.row.original.user.image}
                  />
                ) : (
                  <div className="flex-shrink-0 avatar-xs me-2">
                    <div className="avatar-title bg-soft-success text-success rounded-circle fs-13">
                      {campaignMember.row.original.user.name.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-grow-1 ms-2 name">
                {campaignMember.row.original.user.name}{" "}
                {campaignMember.row.original.status}
              </div>
            </div>
          </>
        ),
      },
    ];

    const rankColumn = [
      {
        Header: "الرتبة",
        filterable: false,
        Cell: (cellProps) => {
          const rankId = cellProps.row.original.rank;
          const rank = MemberRankOptions.find((option) => option.id === rankId);

          return (
            <p className="text-success">
              <strong>{rank ? rank.name : "Unknown"}</strong>
            </p>
          );
        },
      },
    ];

    const mobileColumn = [
      {
        Header: "التليفون",
        filterable: false,
        Cell: (cellProps) => {
          return <p>{cellProps.row.original.mobile}</p>;
        },
      },
    ];

    let teamColumn = [];
    if ([1, 2].includes(activeTab)) {
      teamColumn = [
        {
          Header: "الفريق",
          filterable: false,
          Cell: () => <p>{campaignMembers.length}</p>,
        },

      ];
    }

    let guaranteesColumn = [];
    if ([1, 2, 3, 4].includes(activeTab)) {
      guaranteesColumn = [
        {
          Header: "المضامين",
          filterable: false,
          Cell: (cellProps) => <p>{getGuaranteeCountForMember(cellProps.row.original.id)}</p>,
          // Use row.original.id to access the original row data's 'id' value
        },
      ];
    }

    let committeeColumns = [];
    if ([5, 6].includes(activeTab)) {
      committeeColumns = [
        {
          Header: "اللجان",
          filterable: false,
          Cell: (cellProps) => {
            const committeeId = cellProps.row.original.committee;

            if (committeeId === null) {
              return (
                <p className="text-danger">
                  <strong>N/A</strong>
                </p>
              );
            }

            const committee = campaignCommittees.find(
              (committee) => committee.id === committeeId
            );
            return (
              <p className="text-success">
                <strong>{committee ? committee.name : "Not Found"}</strong>
              </p>
            );
          },
        },
      ];
    }

    let attendantColumns = [];
    if ([5].includes(activeTab)) {
      attendantColumns = [
        {
          Header: "الحضور",
          filterable: false,
          Cell: (cellProps) => <p>{getAttendeeCountForMember(cellProps.row.original.id)}</p>,
        },
      ];
    }
    let sorterColumns = [];
    if ([6].includes(activeTab)) {
      attendantColumns = [
        {
          Header: "تم الفرز",
          filterable: false,
          Cell: () => (
            <p>
              {campaignGuarantees.length} <span>70%</span>
            </p>
          ),
        },
      ];
    }

    let SupervisorColumns = [];
    if ([0, 3, 4, 5].includes(activeTab)) {
      SupervisorColumns = [
        {
          Header: "المشرف",
          filterable: false,
          Cell: (cellProps) => {
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
                  {supervisor ? supervisor.user.name : "Not Found"}
                </strong>
              </p>
            );
          },
        },
      ];
    }

    const actionColumn = [
      {
        Header: "إجراءات",
        Cell: (cellProps) => {
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
              {isAdmin && (
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
                </>
              )}
            </div>
          );
        },
      },
    ];

    // concatenate in the order you prefer
    return memberColumn.concat(
      // memberColumn,
      rankColumn,
      mobileColumn,
      teamColumn,
      guaranteesColumn,
      committeeColumns,
      attendantColumns,
      sorterColumns,
      currentCampaignMember.rank !== 3 ? SupervisorColumns : [],
      actionColumn
    );
  }, [handleCampaignMemberClick, checkedAll, activeTab, campaignGuarantees.length, campaignMembers, currentCampaignMember.rank, campaignCommittees, getAttendeeCountForMember, getGuaranteeCountForMember, isAdmin]);


  // Filters -------------------------
  const [filters, setFilters] = useState({
    global: "",
    rank: null,
  });

  const campaignMemberList = campaignMembers.filter(campaignMember => {
    let isValid = true;

    if (filters.rank !== null) {
      isValid = isValid && campaignMember.rank === filters.rank;
    }

    if (filters.global) {
      isValid = isValid && campaignMember.user.name && typeof campaignMember.user.name === 'string' && campaignMember.user.name.toLowerCase().includes(filters.global.toLowerCase());
    }

    return isValid;
  });
  
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCampaignMember}
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
      <CampaignMembersModal
        modal={isModalVisible}
        modalMode={modalMode}
        toggle={toggle}
        campaignMember={campaignMember}
      />
      <Row>
        <Col lg={12}>
          <Card id="memberList">
            <CardBody>
              <div>
                <TableContainerHeader
                  // Title
                  ContainerHeaderTitle="فريق العمل"

                  // Add Button
                  isAddButton={true}
                  AddButtonText="أضافة عضو"
                  handleAddButtonClick={handleCampaignMemberClicks}
                  toggle={toggle}

                  // Delete Button
                  isMultiDeleteButton={isMultiDeleteButton}
                  setDeleteModalMulti={setDeleteModalMulti}
                />

                {campaignMemberList ? (
                  <TableContainer
                    // Others to be investigateed
                    modal={modal}
                    setModal={setModal}
                    modalMode="AddModal"
                    setModalMode={setModalMode}
                    toggle={toggle}
                    campaignMember={campaignMember}

                    // Filters -------------------------
                    isTableContainerFilter={true}
                    isGlobalFilter={true}
                    preGlobalFilteredRows={true}

                    isMemberRankFilter={true}
                    isResetFilters={true}

                    // Settings
                    filters={filters}
                    setFilters={setFilters}
                    // preGlobalFilteredRows={true}
                    SearchPlaceholder="البحث..."

                    // Actions
                    onTabChange={handleTabChange}


                    // Data -------------------------
                    columns={columns}
                    data={campaignMemberList || []}
                    // setCampaignMemberList={setCampaignMemberList}
                    customPageSize={50}
                    // TODO: to find out what is this for and how to be used with the table
                    // handleItemClick={() => handleCampaignMemberClick(campaignMember, "AddModal")}

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

export default MembersTab;
