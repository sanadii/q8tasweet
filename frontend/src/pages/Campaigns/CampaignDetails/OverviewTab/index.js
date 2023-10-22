// Pages/Campaigns/CampaignDetails/index.js
// React & Redux core
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Store & Selectors
import { userSelector, campaignSelector } from 'Selectors';

// Components, Constants & Hooks
import usePermission from "Components/Hooks/usePermission";
import OverViewGuarantees from "./OverViewGuarantees";
// import OverViewNotifications from "./Components/OverViewNotifications";

// UI & Utilities
import { Card, CardBody, Col, Row } from "reactstrap";

const OverviewTab = () => {
  const {
    campaignDetails,
    currentCampaignMember,
    campaignMembers,
    campaignRoles,
    campaignElectionCandidates,
    campaignElectionCommittees,
  } = useSelector(campaignSelector);

  const {
    currentUser,
  } = useSelector(userSelector);
  document.title = "Campaign Overview | Q8Tasweet";

  // Permissions
  const { canChangeConfig } = usePermission();

  // Custom hook to get members with a specific role by role name
  function useMembersWithRole(roleName, campaignRoles = [], campaignMembers = []) {
    const [membersWithRole, setMembersWithRole] = useState([]);

    useEffect(() => {
      const foundRole = campaignRoles.find(roleObj => roleObj.name === roleName);
      const members = foundRole ? campaignMembers.filter(member => member.role === foundRole.id) : [];
      setMembersWithRole(members);
    }, [roleName, campaignRoles, campaignMembers]);

    return membersWithRole;
  }

  function useCurrentMemberRole(canChangeConfig, campaignRoles = [], currentCampaignMember = {}) {
    if (canChangeConfig) {
      return 'مدير النظام';
    } else {
      const roleObj = campaignRoles.find(role => role.id === currentCampaignMember.role);
      return roleObj?.name || 'مشترك';
    }
  }

  // Usage of custom hooks
  const campaignModerators = useMembersWithRole('campaignModerator', campaignRoles, campaignMembers);
  const campaigCoordinators = useMembersWithRole('campaignCoordinator', campaignRoles, campaignMembers);
  const currentMemberRole = useCurrentMemberRole(canChangeConfig, campaignRoles, currentCampaignMember);

  return (
    <React.Fragment>
      <Row>
        <Col lg={3}>
          <Card>
            <CardBody>
              <h5 className="card-title mb-3"><strong>الإنتخابات</strong></h5>
              <ul>
                <li>الانتخابات: <strong>{campaignDetails.election.name}</strong></li>
                <li>المرشحين: <strong>{(campaignElectionCandidates?.length ?? 0)} مرشح</strong></li>
                <li>المقاعد: <strong>{campaignDetails.election.electSeats} مقعد</strong></li>
                <li>الأصوات: <strong>{campaignDetails.election.electVotes} صوت</strong></li>
                <li>اللجان: <strong>{(campaignElectionCommittees?.length ?? 0)} لجنة</strong></li>


              </ul>
              <hr />
              <h5 className="card-title mb-3"><strong>الإدارة</strong></h5>
              <ul>
                {campaignModerators && campaignModerators.length > 0 && (
                  <li>
                    المراقب: <strong>{campaignModerators.map(moderator => moderator.fullName).join(' | ')}</strong>
                  </li>
                )}
                <li>المرشح: <strong>{campaignDetails.candidate.name}</strong></li>
                {campaigCoordinators && campaigCoordinators.length > 0 &&
                  <li>
                    المنسق: <strong>{campaigCoordinators.map(coordinator => coordinator.fullName).join(' | ')}</strong>
                  </li>
                }
              </ul>
              <hr />
              {canChangeConfig ?
                <div>
                  <h5 className="card-title mb-3"><strong>الإدارة</strong></h5>
                  <ul className="text-danger">
                    <li>رمز الإنتخابات: <strong>{campaignDetails.election.id}</strong></li>
                    <li>رمز المرشح: <strong>{campaignDetails.candidate.id}</strong></li>
                    <li>رمز الحملة: <strong>{campaignDetails.id}</strong></li>
                  </ul>
                </div>
                :
                <div>
                  <h5 className="card-title mb-3"><strong>المستخدم</strong></h5>
                  <ul>
                    <li>الإسم: <strong>{currentCampaignMember.fullName}</strong></li>
                    <li>رمز المستخدم: <strong>{currentUser.id}</strong></li>
                    <li>العضوية: <strong>{currentMemberRole}</strong></li>
                    <li>رمز العضوية: <strong>{currentCampaignMember.id}</strong></li>
                    {/* <li>اللجنة: <strong> {committeeName}</strong></li> */}
                  </ul>
                </div>
              }
            </CardBody>
          </Card>
        </Col>
        <Col lg={9}>
          <Card>
            <CardBody>
              <h5 className="card-title mb-3"><strong>عن المرشح</strong></h5>
              {campaignDetails.description}
              <Row className="flex-d">
                <Col>
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                        <i className="ri-twitter-fill"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">تويتر :</p>
                      <h6 className="text-truncate mb-0">
                        <Link
                          to={`https://www.twitter.com/${campaignDetails.twitter}`}
                          className="fw-semibold">
                          {campaignDetails.twitter}
                        </Link>
                      </h6>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                        <i className="ri-instagram-fill"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">انستقرام :</p>
                      <h6 className="text-truncate mb-0">
                        <Link
                          to={`https://www.instagram.com/${campaignDetails.instagram}`}
                          className="fw-semibold">
                          {campaignDetails.instagram}
                        </Link>
                      </h6>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div className="d-flex mt-4">
                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                        <i className="ri-global-line"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="mb-1">الموقع الإلكتروني :</p>
                      <Link
                        to={campaignDetails.website}
                        className="fw-semibold">
                        {campaignDetails.website}
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Row>
            <OverViewGuarantees />
          </Row>
          <Row>
            {/* <OverViewNotifications /> */}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OverviewTab;
