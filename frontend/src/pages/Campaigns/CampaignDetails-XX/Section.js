import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

//import images
import slack from "../../../assets/images/brands/slack.png";
import OverviewTab from "./OverviewTab";
import MembersTab from "./MembersTab";
import CandidatesTab from "./CandidatesTab";
import CampaignsTab from "./CampaignsTab";
import DocumentsTab from "./DocumentsTab";
import ActivitiesTab from "./ActivitiesTab";

import EditTab from "./EditTab";

// const Section = ({ campaign, campaignCandidateList }) => {
const Section = ({ campaign, candidate, election, campaignMembers }) => {
  // console.log("Campaign:", campaign);
  // console.log("Candidate:", candidate);
  // console.log("Election:", election);
  // console.log("campaignMembers:", campaignMembers);

  //Tab
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card className="mt-n4 mx-n4">
            <div className="bg-soft-warning">
              <CardBody className="pb-0 px-4">
                <Row className="mb-3">
                  <div className="col-md">
                    <Row className="align-items-center g-3">
                      <div className="col-md-auto">
                        <div className="avatar-md">
                          <div className="avatar-title bg-white rounded-circle">
                            <img src={slack} alt="" className="avatar-xs" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md">
                        <div>
                          <h4 className="fw-bold">
                            {campaign?.id}: {candidate?.name}
                          </h4>
                          <div className="hstack gap-3 flex-wrap">
                            <div>
                              <i className="ri-building-line align-bottom me-1"></i>
                              {campaign.category}
                            </div>
                            <div className="vr"></div>
                            <div>
                              Create Date :{" "}
                              <span className="fw-medium">
                                {election?.duedate}
                              </span>
                            </div>
                            <div className="vr"></div>
                            <div>
                              Due Date :{" "}
                              <span className="fw-medium">
                                {campaign.duedate}
                              </span>
                            </div>
                            <div className="vr"></div>
                            <div className="badge rounded-pill bg-info fs-12">
                              {election.title}
                            </div>
                            <div className="badge rounded-pill bg-danger fs-12">
                              {campaign.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </div>
                  <div className="col-md-auto">
                    <div className="hstack gap-1 flex-wrap">
                      <button
                        type="button"
                        className="btn py-0 fs-16 favourite-btn active"
                      >
                        <i className="ri-star-fill"></i>
                      </button>
                      <button
                        type="button"
                        className="btn py-0 fs-16 text-body"
                      >
                        <i className="ri-share-line"></i>
                      </button>
                      <button
                        type="button"
                        className="btn py-0 fs-16 text-body"
                      >
                        <i className="ri-flag-line"></i>
                      </button>
                    </div>
                  </div>
                </Row>

                <Nav className="nav-tabs-custom border-bottom-0" role="tablist">
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "1" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("1");
                      }}
                      href="#"
                    >
                      Overview
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "2" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("2");
                      }}
                      href="#"
                    >
                      Members
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "3" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("3");
                      }}
                      href="#"
                    >
                      Guarantees
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "4" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("4");
                      }}
                      href="#"
                    >
                      Attendees
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "5" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("5");
                      }}
                      href="#"
                    >
                      Sorting
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "6" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("6");
                      }}
                      href="#"
                    >
                      Activities
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames(
                        { active: activeTab === "7" },
                        "fw-semibold"
                      )}
                      onClick={() => {
                        toggleTab("7");
                      }}
                      href="#"
                    >
                      Edit
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardBody>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <TabContent activeTab={activeTab} className="text-muted">
            <TabPane tabId="1">
              <OverviewTab campaign={campaign} />
            </TabPane>
            <TabPane tabId="2">
              <MembersTab campaignMembers={campaignMembers} />
            </TabPane>
            {/* <TabPane tabId="7">
              <CandidatesTab campaignCandidateList={campaignCandidateList} />
            </TabPane> */}
            {/*    <TabPane tabId="3">
              <CampaignsTab campaign={campaign} />
            </TabPane>
            <TabPane tabId="4">
              <DocumentsTab campaignCandidateList={campaignCandidateList} />
            </TabPane>
            <TabPane tabId="5">
              <ActivitiesTab campaign={campaign} />
            </TabPane>
            <TabPane tabId="6">
              <EditTab campaign={campaign} />
            </TabPane> */}
          </TabContent>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;
