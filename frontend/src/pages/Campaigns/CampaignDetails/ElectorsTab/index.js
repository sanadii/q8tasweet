// React, Redux & Store imports
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getElectors, addNewCampaignGuarantee, addNewCampaignAttendee } from "../../../../store/actions";
import { Loader, TableContainer } from "Components/Common";
import { campaignSelector, electorSelector } from 'Selectors';

// Component imports
import ElectorsModal from "./ElectorsModal";
import { Id, Name, Actions } from "./ElectorsCol";

// Reactstrap (UI) imports
import { Col, Row, Card, CardHeader, CardBody, Label, Input } from "reactstrap";

// Utility imports
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ElectorsTab = () => {
  const dispatch = useDispatch();

  const {
    currentCampaignMember,
    campaignDetails,
    campaignMembers,
    campaignGuarantees,
    campaignAttendees,
  } = useSelector(campaignSelector);

  const { electors } = useSelector(electorSelector);
  const [campaignGuaranteeList, setCampaignGuaranteeList] = useState(campaignGuarantees);
  const [campaignAttendeeList, setCampaignAttendeeList] = useState(campaignAttendees);

  useEffect(() => {
    setCampaignGuaranteeList(campaignGuarantees);
  }, [campaignGuarantees]);


  useEffect(() => {
    setCampaignAttendeeList(campaignAttendees);
  }, [campaignAttendees]);

  // Add New CampaignGuarantee Search & Filter
  const [searchElectorInput, setSearchElectorInput] = useState("");
  const [electorList, setElectorList] = useState(electors);

  useEffect(() => {
    setElectorList(electors);
  }, [electors]);

  const handleSearch = (event) => {
    event.preventDefault();

    const searchParameters = {
      searchInput: searchElectorInput,
    };

    dispatch(getElectors(searchParameters));
  };

  const [campaignGuarantee, setCampaignGuarantee] = useState(null); // initialized to null

  const guarantorMembers = campaignMembers.filter(
    (member) => member.role === 3 || member.role === 4
  );

  // Modal Constants
  const [modal, setModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggle = useCallback(() => {
    setIsModalVisible(prevIsModalVisible => !prevIsModalVisible);
  }, []);


  // View Elector Info
  const [elector, setElector] = useState(null);

  const handleElectorClick = useCallback(
    (arg, modalMode) => {
      const elector = arg;
      setElector({
        // Elector Fields
        civil: elector.civil,
        campaignId: campaignDetails.id,
        gender: elector.gender,
        fullName: elector.fullName,
        status: elector.status,
        notes: elector.notes,
      });
      // Set the modalMode state here
      setModalMode(modalMode);
      toggle();
    },
    [toggle, campaignDetails.id]
  );

  const getGenderIcon = (gender) => {
    if (gender === 2) {
      return <i className="mdi mdi-circle align-middle text-danger me-2"></i>;
    } else if (gender === 1) {
      return <i className="mdi mdi-circle align-middle text-info me-2"></i>;
    }
    return null;
  };

  const columns = useMemo(
    () => [
      {
        Header: "الاسم",
        accessor: row => ({ fullName: row.fullName, gender: row.gender }),
        Cell: (cellProps) => <Name {...cellProps} />
      },
      
      {
        Header: "اجراءات",
        Cell: (cellProps) => <Actions
          cellProps={cellProps}
          handleElectorClick={handleElectorClick}
          currentCampaignMember={currentCampaignMember}
          campaignGuarantees={campaignGuarantees}
          campaignAttendees={campaignAttendees}
          campaignDetails={campaignDetails}
          electors={electors} />
      },
    ],
    [
      handleElectorClick,
      campaignDetails.election.id,
      campaignDetails.id,
      campaignGuarantees,
      campaignAttendees,
      currentCampaignMember.committee,
      currentCampaignMember.id,
      currentCampaignMember.role,
      currentCampaignMember.user.id,
      dispatch,
      electors,
    ]);
  return (
    <React.Fragment>
      <ElectorsModal
        modal={isModalVisible}
        modalMode={modalMode}
        toggle={toggle}
        elector={elector}
      />
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <Row className="mb-2">
                <h4>
                  <b>البحث - الناخبين</b>
                </h4>
              </Row>
            </CardHeader>
            <CardBody className="border border-dashed border-end-0 border-start-0">
              <form onSubmit={handleSearch}>
                <Row className="mb-3">
                  <div className="d-flex align-items-center ">
                    <div className="col d-flex g-2 row">
                      <Col xxl={3} md={6}>
                        <Input
                          type="text"
                          value={searchElectorInput}
                          onChange={(e) =>
                            setSearchElectorInput(e.target.value)
                          }
                          placeholder="Search by Civil ID or Name..."
                        />
                      </Col>
                      <Col xxl={3} md={6}>
                        <button type="submit" className="btn btn-primary">
                          إبحث
                        </button>
                      </Col>
                    </div>
                  </div>
                </Row>
              </form>
              {electorList && electorList.length ? (
                <TableContainer
                  columns={columns}
                  data={electorList || []}
                  customPageSize={50}
                  className="custom-header-css"
                  divClass="table-responsive table-card mb-2"
                  tableClass="align-middle table-nowrap"
                  theadClass="table-light"
                />
              ) : (
                <p>لا شيء لعرضه، ابدأ أو قم بتحسين بحثك</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ElectorsTab;