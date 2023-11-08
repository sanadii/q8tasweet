import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCampaignGuarantee } from "../../../../store/actions";
import { campaignSelector } from 'Selectors';

// Component imports
import { Col, Row, Card, CardBody } from "reactstrap";
import { Loader, DeleteModal, TableContainer, TableContainerHeader, TableContainerFilter } from "../../../../components";
import { Id, Name, Phone, Attended, Status, Guarantor, Actions } from "./GuaranteesCol";

import GuaranteesModal from "./GuaranteesModal";

// Utility imports
import { toast, ToastContainer } from "react-toastify";

// CSS imports
import "react-toastify/dist/ReactToastify.css";

const GuaranteesTab = () => {
  const dispatch = useDispatch();

  // States
  const { campaignGuarantees, campaignMembers, isCampaignGuaranteeSuccess, error } = useSelector(campaignSelector);

  // CampaignGuarantees Constants
  const [campaignGuarantee, setCampaignGuarantee] = useState(null);

  // Delete Modal Constants
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  // Delete Multiple Constants
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  // Delete Data
  const handleDeleteCampaignGuarantee = () => {
    if (campaignGuarantee) {
      dispatch(deleteCampaignGuarantee(campaignGuarantee.id));
      setDeleteModal(false);
    }
  };

  const onClickDelete = (campaignGuarantee) => {
    setCampaignGuarantee(campaignGuarantee);
    setDeleteModal(true);
  };

  // Modal Constants
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggle = useCallback(() => {
    setIsModalVisible(prevIsModalVisible => !prevIsModalVisible);
  }, []);

  const handleCampaignGuaranteeClick = useCallback(
    (arg, modalMode) => {
      const campaignGuarantee = arg;
      setCampaignGuarantee({
        id: campaignGuarantee.id,
        member: campaignGuarantee.member,
        campaign: campaignGuarantee.campaign,
        civil: campaignGuarantee.civil,
        fullName: campaignGuarantee.fullName,
        gender: campaignGuarantee.gender,
        boxNo: campaignGuarantee.box_no,
        membershipNo: campaignGuarantee.membership_no,
        enrollmentDate: campaignGuarantee.enrollment_date,
        phone: campaignGuarantee.phone,
        status: campaignGuarantee.status,
        notes: campaignGuarantee.notes,
      });

      // Set the modalMode state here
      setModalMode(modalMode);
      toggle();
    },
    [toggle]
  );

  // Checked All
  // const checkedAll = useCallback(() => {
  //   const checkall = document.getElementById("checkBoxAll");
  //   const checkedEntry = document.querySelectorAll(
  //     ".campaignGuaranteeCheckBox"
  //   );

  //   if (checkall.checked) {
  //     checkedEntry.forEach((checkedEntry) => {
  //       checkedEntry.checked = true;
  //     });
  //   } else {
  //     checkedEntry.forEach((checkedEntry) => {
  //       checkedEntry.checked = false;
  //     });
  //   }
  //   deleteCheckbox();
  // }, []);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(deleteCampaignGuarantee(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const checkedEntry = document.querySelectorAll(
      ".campaignGuaranteeCheckBox:checked"
    );
    checkedEntry.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(checkedEntry);
  };

  const memberName = (campaignMembers || []).reduce((acc, member) => {
    acc[member.id] = member;
    return acc;
  }, {});
  const columns = useMemo(
    () => [
      {
        Header: "م.",
        accessor: "id",
        Cell: (cellProps) => <Id {...cellProps} />
      },
      {
        Header: "الاسم",
        accessor: row => ({ fullName: row.fullName, gender: row.gender }),
        Cell: (cellProps) => <Name {...cellProps} />
      },
      {
        Header: "التليفون",
        accessor: "phone",
        Cell: (cellProps) => <Phone {...cellProps} />
      },
      {
        Header: "الحضور",
        accessor: "attended",
        Cell: (cellProps) => <Attended {...cellProps} />
      },
      {
        Header: "الحالة",
        filterable: false,
        Cell: (cellProps) => <Status {...cellProps} />
      },
      {
        Header: "الضامن",
        filterable: false,
        Cell: (cellProps) =>
          <Guarantor
            cellProps={cellProps}
            campaignMembers={campaignMembers}
          />
      },
      {
        Header: "إجراءات",
        Cell: (cellProps) =>
          <Actions
            cellProps={cellProps}
            handleCampaignGuaranteeClick={handleCampaignGuaranteeClick}
            onClickDelete={onClickDelete}
          />
      },
    ], [handleCampaignGuaranteeClick, campaignMembers]);

  // Filters----------
  const [filters, setFilters] = useState({
    global: "",
    attended: null,
    gender: null,
    status: null,
    member: null,
  });

  const campaignGuaranteeList = campaignGuarantees.filter(campaignGuarantee => {
    let isValid = true;
    if (filters.global) {
      const globalSearch = filters.global.toLowerCase();

      const nameIncludes = campaignGuarantee.fullName && typeof campaignGuarantee.fullName === 'string' && campaignGuarantee.fullName.toLowerCase().includes(globalSearch);
      const civilIncludes = campaignGuarantee.civil && typeof campaignGuarantee.civil === 'number' && String(campaignGuarantee.civil).includes(globalSearch);

      isValid = isValid && (nameIncludes || civilIncludes);
    }
    if (filters.attended !== null) {
      isValid = isValid && campaignGuarantee.attended === filters.attended;
    }
    if (filters.gender !== null) {
      isValid = isValid && campaignGuarantee.gender === filters.gender;
    }
    if (filters.status !== null) {
      isValid = isValid && campaignGuarantee.status === filters.status;
    }
    if (filters.member !== null) {
      isValid = isValid && campaignGuarantee.member === filters.member;
    }
    return isValid;
  });

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCampaignGuarantee}
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

      <GuaranteesModal
        modal={isModalVisible}
        modalMode={modalMode}
        toggle={toggle}
        campaignGuarantee={campaignGuarantee}
      />
      <Row>
        <Col lg={12}>
          <Card id="memberList">
            <CardBody>
              <div>
                <TableContainerHeader
                  // Title
                  ContainerHeaderTitle="المضامين"

                  // Add Elector Button
                  // isAddElectorButton={true}
                  // AddButtonText="Add New Guarantee"
                  // handleAddButtonClick={handleCampaignMemberClicks}
                  toggle={toggle}

                  // Delete Button
                  isMultiDeleteButton={isMultiDeleteButton}
                  setDeleteModalMulti={setDeleteModalMulti}
                />

                {campaignGuaranteeList ? (
                  <TableContainer
                    // Filters----------
                    isTableContainerFilter={true}
                    isGlobalFilter={true}
                    preGlobalFilteredRows={true}

                    isGenderFilter={true}
                    isGuaranteeAttendanceFilter={true}
                    isGuaranteeStatusFilter={true}
                    isGuarantorFilter={true}
                    isResetFilters={true}

                    // Settings
                    filters={filters}
                    setFilters={setFilters}
                    SearchPlaceholder="البحث بالاسم أو الرقم المدني..."

                    // Data----------
                    columns={columns}
                    data={campaignGuaranteeList || []}
                    customPageSize={50}
                    // setCampaignGuaranteeList={setCampaignGuaranteeList}

                    // Styling----------
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

export default GuaranteesTab;
