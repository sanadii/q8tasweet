import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import { ImageGenderCircle, Loader, DeleteModal, ExportCSVModal, TableContainer, TableContainerHeader } from "../../../Components/Common";
import { electionSelector } from 'Selectors';


//SimpleBar
import SimpleBar from "simplebar-react";

const OverviewTab = ({ election }) => {

  const { electionDetails, electionCandidates, electionCampaigns, electionCommittees } = useSelector(electionSelector);

  const moderators = Array.isArray(election.moderators)
    ? election.moderators
    : [];

  return (
    <React.Fragment>
      <Row>
        <Col xl={9} lg={8}>
          <Card>
            <CardBody>
              <div className="text-muted">
                <div className="pt-3 buttom-top buttom-top-dashed mb-4">
                  <Row>
                    <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">يوم الإقتراع:</p>
                        <h5 className="fs-15 mb-0">{election.dueDate}</h5>
                      </div>
                    </Col>
                    <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">نوع الإنتخابات:</p>
                        <div className="badge bg-danger fs-12">
                          {election.type}
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">عدد الأصوات:</p>
                        <div className="badge bg-warning fs-12">
                          {election.votes} صوت
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} sm={6}>
                      <div>
                        <p className="mb-2 text-uppercase fw-medium">
                          المقاعد:
                        </p>
                        <div className="badge bg-warning fs-12">
                          {election.seats} مقاعد
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <h6 className="mb-3 fw-semibold text-uppercase">Summary</h6>
                <p>{election.description}</p>
              </div>
            </CardBody>
          </Card>
          {/* <Card>
            <CardHeader className="align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Comments</h4>
              <div className="flex-shrink-0">
                <UncontrolledDropdown className="card-header-dropdown">
                  <DropdownToggle
                    tag="a"
                    className="text-reset dropdown-btn"
                    href="#"
                  >
                    <span className="text-muted">
                      Recent<i className="mdi mdi-chevron-down ms-1"></i>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem>Recent</DropdownItem>
                    <DropdownItem>Top Rated</DropdownItem>
                    <DropdownItem>Previous</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </CardHeader>

            <CardBody>
              <SimpleBar
                style={{ height: "300px" }}
                className="px-3 mx-n3 mb-2"
              >
                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <img
                      src={avatar8}
                      alt=""
                      className="avatar-xs rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fs-13">
                      Joseph Parker{" "}
                      <small className="text-muted ms-2">
                        20 Dec 2021 - 05:47AM
                      </small>
                    </h5>
                    <p className="text-muted">
                      I am getting message from customers that when they place
                      order always get error message .
                    </p>
                    <Link to="#" className="badge text-muted bg-light">
                      <i className="mdi mdi-reply"></i> Reply
                    </Link>
                    <div className="d-flex mt-4">
                      <div className="flex-shrink-0">
                        <img
                          src={avatar10}
                          alt=""
                          className="avatar-xs rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="fs-13">
                          Alexis Clarke{" "}
                          <small className="text-muted ms-2">
                            22 Dec 2021 - 02:32PM
                          </small>
                        </h5>
                        <p className="text-muted">
                          Please be sure to check your Spam mailbox to see if
                          your email filters have identified the email from Dell
                          as spam.
                        </p>
                        <Link to="#" className="badge text-muted bg-light">
                          <i className="mdi mdi-reply"></i> Reply
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex mb-4">
                  <div className="flex-shrink-0">
                    <img
                      src={avatar6}
                      alt=""
                      className="avatar-xs rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fs-13">
                      Donald Palmer{" "}
                      <small className="text-muted ms-2">
                        24 Dec 2021 - 05:20PM
                      </small>
                    </h5>
                    <p className="text-muted">
                      If you have further questions, please contact Customer
                      Support from the “Action Menu” on your{" "}
                      <Link to="#" className="text-decoration-underline">
                        Online Order Support
                      </Link>
                      .
                    </p>
                    <Link to="#" className="badge text-muted bg-light">
                      <i className="mdi mdi-reply"></i> Reply
                    </Link>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      src={avatar10}
                      alt=""
                      className="avatar-xs rounded-circle"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fs-13">
                      Alexis Clarke{" "}
                      <small className="text-muted ms-2">26 min ago</small>
                    </h5>
                    <p className="text-muted">
                      Your{" "}
                      <Link to="#" className="text-decoration-underline">
                        Online Order Support
                      </Link>{" "}
                      provides you with the most current status of your order.
                      To help manage your order refer to the “Action Menu” to
                      initiate return, contact Customer Support and more.
                    </p>
                    <Row className="g-2 mb-3">
                      <div className="col-lg-1 col-sm-2 col-6">
                        <img
                          src={image4}
                          alt=""
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-lg-1 col-sm-2 col-6">
                        <img
                          src={image5}
                          alt=""
                          className="img-fluid rounded"
                        />
                      </div>
                    </Row>
                    <Link to="#" className="badge text-muted bg-light">
                      <i className="mdi mdi-reply"></i> Reply
                    </Link>
                    <div className="d-flex mt-4">
                      <div className="flex-shrink-0">
                        <img
                          src={avatar6}
                          alt=""
                          className="avatar-xs rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="fs-13">
                          Donald Palmer{" "}
                          <small className="text-muted ms-2">8 sec ago</small>
                        </h5>
                        <p className="text-muted">
                          Other shipping methods are available at checkout if
                          you want your purchase delivered faster.
                        </p>
                        <Link to="#" className="badge text-muted bg-light">
                          <i className="mdi mdi-reply"></i> Reply
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SimpleBar>
              <form className="mt-4">
                <Row className="g-3">
                  <Col xs={12}>
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label text-body"
                    >
                      Leave a Comments
                    </label>
                    <textarea
                      className="form-control bg-light border-light"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Enter your comment..."
                    ></textarea>
                  </Col>
                  <Col xs={12} className="text-end">
                    <button
                      type="button"
                      className="btn btn-ghost-secondary btn-icon waves-effect me-1"
                    >
                      <i className="ri-attachment-line fs-16"></i>
                    </button>
                    <Link to="#" className="btn btn-success">
                      Post Comments
                    </Link>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card> */}
        </Col>

        <Col xl={3} lg={4}>
          {/* <Card>
            <CardHeader className="align-items-center d-flex border-bottom-dashed">
              <h5 className="card-title mb-0 flex-grow-1">Moderators</h5>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-soft-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#inviteMembersModal"
                >
                  <i className="ri-add-line me-1 align-bottom"></i>Add
                </button>
              </div>
            </CardHeader>
            <CardBody>
              <SimpleBar
                data-simplebar
                style={{ height: "235px" }}
                className="mx-n3 px-3"
              >
                <div className="vstack gap-3">
                  {moderators.map((moderator, index) => (
                    <Link key={index} to="#" className="avatar-group-item">
                      {moderator ? (
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs flex-shrink-0 me-3">
                            <img
                              src={
                                process.env.REACT_APP_API_URL + moderator.img
                              }
                              alt={moderator.name}
                              title={moderator.name}
                              alt=""
                              className="img-fluid rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="fs-13 mb-0">{moderator.name}</h5>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="d-flex align-items-center gap-1">
                              <button
                                type="button"
                                className="btn btn-light btn-sm"
                              >
                                Message
                              </button>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  type="button"
                                  className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                  tag="button"
                                >
                                  <i className="ri-more-fill"></i>
                                </DropdownToggle>
                                <DropdownMenu>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                                      View
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-star-fill text-muted me-2 align-bottom"></i>
                                      Favourite
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem>
                                      <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>
                                      Delete
                                    </DropdownItem>
                                  </li>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </div>
                          </div>
                        </div>
                      ) : (
                        "No Moderator"
                      )}
                    </Link>
                  ))}
                </div>
              </SimpleBar>
            </CardBody>
          </Card> */}
          <Card>
            <CardHeader className="align-items-center d-flex border-bottom-dashed">
              <h4 className="card-title mb-0 flex-grow-1">Campaigns</h4>
              <div className="flex-shrink-0">
                <button
                  type="button"
                  className="btn btn-soft-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#inviteMembersModal"
                >
                  <i className="ri-add-line me-1 align-bottom"></i>Add
                </button>
              </div>
            </CardHeader>

            <CardBody>
              <SimpleBar
                data-simplebar
                style={{ height: "235px" }}
                className="mx-n3 px-3"
              >
                {electionCampaigns && electionCampaigns.length ? (
                  electionCampaigns.map((campaign, index) => (

                    <div className="vstack gap-3"
                      key={campaign.id || index}  // Assuming campaign.id is a unique identifier for each campaign
                    >
                      <div className="d-flex align-items-center">
                        <div className="avatar-xs flex-shrink-0 me-3">
                          {campaign.candidate.image ? (
                            // Use the ImageCircle component here
                            <ImageGenderCircle
                              genderValue={campaign.candidate.gender}
                              imagePath={campaign.candidate.image}
                            />
                          ) : (
                            <div className="flex-shrink-0 avatar-xs me-2">
                              <div className="avatar-title bg-soft-success text-success rounded-circle fs-13">
                                {campaign.candidate.name.charAt(0)}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fs-13 mb-0">
                            <Link to="#" className="text-body d-block">
                              {campaign.candidate.name}
                            </Link>
                          </h5>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="d-flex align-items-center gap-1">
                            <button type="button" className="btn btn-light btn-sm">
                              Message
                            </button>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                type="button"
                                className="btn btn-icon btn-sm fs-16 text-muted dropdown"
                                tag="button"
                              >
                                <i className="ri-more-fill"></i>
                              </DropdownToggle>
                              <DropdownMenu>
                                <li>
                                  <DropdownItem>
                                    <i className="ri-eye-fill text-muted me-2 align-bottom"></i>
                                    View
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem>
                                    <i className="ri-star-fill text-muted me-2 align-bottom"></i>
                                    Favourite
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem>
                                    <i className="ri-delete-bin-5-fill text-muted me-2 align-bottom"></i>
                                    Delete
                                  </DropdownItem>
                                </li>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No Campaigns Added</p>
                )}
              </SimpleBar>

            </CardBody>
          </Card>
          <Card>
            <CardHeader className="align-items-center d-flex border-bottom-dashed">
              <h4 className="card-title mb-0 flex-grow-1">Database</h4>
              <div className="flex-shrink-0">
                <button type="button" className="btn btn-soft-info btn-sm">
                  <i className="ri-upload-2-fill me-1 align-bottom"></i> Upload
                </button>
              </div>
            </CardHeader>

            <CardBody>
              <div className="vstack gap-2">
                <div className="border rounded border-dashed p-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light text-secondary rounded fs-24">
                          <i className="ri-folder-zip-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="fs-13 mb-1">
                        <Link
                          to="#"
                          className="text-body text-truncate d-block"
                        >
                          App-pages.zip
                        </Link>
                      </h5>
                      <div>2.2MB</div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-icon text-muted btn-sm fs-18"
                        >
                          <i className="ri-download-2-line"></i>
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                            type="button"
                          >
                            <i className="ri-more-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem>
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Rename
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded border-dashed p-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light text-secondary rounded fs-24">
                          <i className="ri-file-ppt-2-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="fs-13 mb-1">
                        <Link
                          to="#"
                          className="text-body text-truncate d-block"
                        >
                          Q8Tasweet-admin.ppt
                        </Link>
                      </h5>
                      <div>2.4MB</div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-icon text-muted btn-sm fs-18"
                        >
                          <i className="ri-download-2-line"></i>
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                            type="button"
                          >
                            <i className="ri-more-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem>
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Rename
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded border-dashed p-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light text-secondary rounded fs-24">
                          <i className="ri-folder-zip-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="fs-13 mb-1">
                        <Link
                          to="#"
                          className="text-body text-truncate d-block"
                        >
                          Images.zip
                        </Link>
                      </h5>
                      <div>1.2MB</div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-icon text-muted btn-sm fs-18"
                        >
                          <i className="ri-download-2-line"></i>
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                            type="button"
                          >
                            <i className="ri-more-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem>
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Rename
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded border-dashed p-2">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-sm">
                        <div className="avatar-title bg-light text-secondary rounded fs-24">
                          <i className="ri-image-2-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <h5 className="fs-13 mb-1">
                        <Link
                          to="#"
                          className="text-body text-truncate d-block"
                        >
                          bg-pattern.png
                        </Link>
                      </h5>
                      <div>1.1MB</div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="btn btn-icon text-muted btn-sm fs-18"
                        >
                          <i className="ri-download-2-line"></i>
                        </button>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="button"
                            className="btn btn-icon text-muted btn-sm fs-18 dropdown"
                            type="button"
                          >
                            <i className="ri-more-fill"></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <li>
                              <DropdownItem>
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Rename
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem>
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </DropdownItem>
                            </li>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <button type="button" className="btn btn-success">
                    View more
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default OverviewTab;
