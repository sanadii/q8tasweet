// React & Redux core
import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";

// Store & Selectors
import { deleteCampaignMember } from "store/actions";
import { campaignSelector } from 'Selectors';

// Compontents, Constants, Hooks
import MembersModal from "./MembersModal";
import { DeleteModal, TableContainer, TableContainerHeader } from "Components/Common";
import { usePermission, useDelete } from "Components/Hooks";
import { Id, Name, Role, Team, Guarantees, Attendees, Committee, Sorted, Supervisor, Actions } from "./MemberCol";

// UI & Utilities
import { Col, Row, Card, CardBody } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MembersTab = () => {

  // State Management
  const {
    currentCampaignMember,
    campaignGuarantees,
    campaignAttendees,
    campaignMembers,
    campaignRoles,
    campaignElectionCommittees,
    isCampaignMemberSuccess,
    error
  } = useSelector(campaignSelector);


  // Permission Hook
  const {
    canChangeConfig,
  } = usePermission();

  // Delete Hook
  const {
    handleDeleteItem,
    onClickDelete,
    setDeleteModal,
    deleteModal,
  } = useDelete(deleteCampaignMember);

  // Filtering and Member Matching
  const [filters, setFilters] = useState({
    global: "",
    role: "campaignManager",
  });

  // Finding Active Role to Show Different Table Columns
  const [activeTab, setActiveTab] = useState("campaignManager");
  const activeRole = activeTab;

  // Model & Toggle Function
  const [campaignMember, setCampaignMember] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);


  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      // setCampaignMember(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const handleCampaignMemberClick = useCallback(
    (arg, modalMode) => {
      const campaignMember = arg;

      setCampaignMember({
        id: campaignMember.id,
        campaignId: campaignMember.campaign,
        userId: campaignMember.user.id,
        name: campaignMember.user.name,
        role: campaignMember.role,
        supervisor: campaignMember.supervisor,
        committee: campaignMember.committee,
        phone: campaignMember.phone,
        notes: campaignMember.notes,
        status: campaignMember.status,
      });
      // Set the modalMode state here
      setModalMode(modalMode);
      toggle();
    },
    [toggle]
  );

  const handleCampaignMemberClicks = () => {
    setCampaignMember("");
    setModalMode("AddModal");
    toggle();
  };


  // Table Columns
  const columnsDefinition = [
    {
      Header: "م.",
      accessor: "id",
      Cell: (cellProps) => <Id {...cellProps} />
    },
    {
      Header: "العضو",
      accessor: "fullName",
      Cell: (cellProps) => <Name {...cellProps} />
    },
    {
      Header: "الرتبة",
      accessor: "role",
      ShowTo: ["campaignManager"],
      Cell: (cellProps) => <Role cellProps={cellProps} campaignRoles={campaignRoles} />
    },
    {
      Header: "الفريق",
      ShowTo: ["campaignManager", "campaignSupervisor"],
      Cell: (cellProps) => <Team cellProps={cellProps} campaignMembers={campaignMembers} />
    },
    {
      Header: "المضامين",
      ShowTo: ["campaignCandidate", "campaigaignManager", "campaignSupervisor", "campaignGuarantor", "campaignManager"],
      Cell: (cellProps) => <Guarantees cellProps={cellProps} campaignGuarantees={campaignGuarantees} />
    },
    {
      Header: "اللجنة",
      ShowTo: ["campaignAttendant", "campaignSorter"],
      Cell: (cellProps) => <Committee cellProps={cellProps} campaignElectionCommittees={campaignElectionCommittees} />
    },
    {
      Header: "الحضور",
      ShowTo: ["campaignAttendant"],
      Cell: (cellProps) => <Attendees cellProps={cellProps} campaignAttendees={campaignAttendees} />
    },
    {
      Header: "تم الفرز",
      ShowTo: ["campaignSorter"],
      Cell: (cellProps) => <Sorted cellProps={cellProps} />
    },
    {
      Header: "المشرف",
      ShowTo: ["campaignGuarantor", "campaignAttendant", "campaignSorter"],
      Cell: (cellProps) => <Supervisor campaignMembers={campaignMembers} cellProps={cellProps} />
    },
    {
      Header: "إجراءات",
      Cell: (cellProps) => (
        <Actions
          cellProps={cellProps}
          handleCampaignMemberClick={handleCampaignMemberClick}
          onClickDelete={onClickDelete}
          canChangeConfig={canChangeConfig}
          campaignMembers={campaignMembers}
          campaignRoles={campaignRoles}
        />
      )
    }
  ];

  const columns = useMemo(() => {
    return columnsDefinition.filter(column => {
      if (!column.ShowTo) return true; // always show columns without a ShowTo key
      return column.ShowTo.includes(activeRole);
    });
  }, [activeRole, columnsDefinition]);


  // Table Filters

  const campaignMemberList = campaignMembers.filter(campaignMember => {
    let isValid = true;

    // Check the role if there's a filter set for it
    if (filters.role !== null) {
      if (Array.isArray(filters.role)) {
        isValid = isValid && filters.role.includes(campaignMember.role);
      } else {
        isValid = isValid && campaignMember.role === filters.role;
      }
    }

    // Check the global filter (e.g., for searching by name)
    if (filters.global) {
      isValid = isValid && campaignMember.user.name &&
        typeof campaignMember.user.name === 'string' &&
        campaignMember.user.name.toLowerCase().includes(filters.global.toLowerCase());
    }

    return isValid;
  });
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteItem}
        onCloseClick={() => setDeleteModal(false)}
      />
      <MembersModal
        modal={modal}
        setModal={setModal}
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
                  AddButtonText="اضافة عضو"
                  handleAddButtonClick={handleCampaignMemberClicks}
                  toggle={toggle}
                />

                {campaignMembers && campaignMembers.length ? (
                  <TableContainer
                    campaignMember={campaignMember}

                    // Filters---------- we need to get activeTab for proper filteration
                    isTableContainerFilter={true}
                    isGlobalFilter={true}
                    preGlobalFilteredRows={true}

                    isMemberRoleFilter={true}
                    isResetFilters={true}

                    // Settings
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}

                    filters={filters}
                    setFilters={setFilters}
                    // preGlobalFilteredRows={true}
                    SearchPlaceholder="البحث..."

                    // Actions
                    // onTabChange={handleTabChange}


                    // Data----------
                    columns={columns}
                    data={campaignMemberList || []}
                    // setCampaignMemberList={setCampaignMemberList}
                    customPageSize={50}
                    // TODO: to find out what is this for and how to be used with the table
                    // handleItemClick={() => handleCampaignMemberClick(campaignMember, "AddModal")}

                    // Styling----------
                    className="custom-header-css"
                    divClass="table-responsive table-card mb-2"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light"
                  />
                ) : (
                  <p>لا يوجد فريق عمل</p>
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