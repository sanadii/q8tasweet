import React from "react";
import { useSelector } from "react-redux";

import { Card, CardBody, Col, Row } from "reactstrap";

const Widgets = () => {
  // const { campaignCount } = useSelector((state) => ({
  //   campaignCount: state.Campaigns.campaignCount,
  // }));

  // const campaignStatuses = ["Active", "Cancelled", "Deleted", "Archived"];

  // New
  const { campaigns } = useSelector((state) => ({
    campaigns: state.Campaigns.campaigns,
  }));

  const campaignStatuses = ["Active", "Cancelled", "Deleted", "Archived"];
  const statusCounts = [
    "Published",
    "Private",
    "Pending",
    "Inprogress",
    "New",
  ].reduce((counts, status) => {
    counts[status] = campaigns.filter((item) => item.status === status).length;
    return counts;
  }, {});

  // Compute the count for each priority
  const priorityCounts = ["High", "Medium", "Low"].reduce(
    (counts, priority) => {
      counts[priority] = campaigns.filter(
        (item) => item.priority === priority
      ).length;
      return counts;
    },
    {}
  );

  return (
    <React.Fragment>
      <div className="row">
        <Col lg={12}>
          <Card>
            <CardBody>
              <h5 className="fs-15 fw-semibold">
                All Campaigns ({campaigns.length})
                {/* All Campaigns ({campaignCount?.["All Campaigns"] || 0}) */}
              </h5>
              <Row>
                <div className="d-flex">
                  <p className="d-flex mb-2 me-3">
                    <b>Status:</b>
                  </p>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div className="d-flex mb-2 me-3" key={status}>
                      <span className="mdi mdi-circle align-middle text-success me-1"></span>
                      {count} {status}
                    </div>
                  ))}

                  {/*     <div className="d-flex mb-2 me-3">
                    <span className="mdi mdi-circle align-middle text-success me-1"></span>
                    {campaignCount?.Status?.Published || 0} Published
                  </div>
                  <div className="d-flex mb-2 me-3">
                    <span className="mdi mdi-circle align-middle text-primary me-1"></span>
                    {campaignCount?.Status?.Private || 0} Private
                  </div>
                  <div className="d-flex mb-2 me-3">
                    <span className="mdi mdi-circle align-middle text-danger me-1"></span>
                    {campaignCount?.Status?.Pending || 0} Pending
                  </div>
                  <div className="d-flex mb-2 me-3">
                    <span className="mdi mdi-circle align-middle text-warning me-1"></span>
                    {campaignCount?.Status?.Inprogress || 0} Inprogress
                  </div>
                  <div className="d-flex mb-2 me-3">
                    <span className="mdi mdi-circle align-middle text-info me-1"></span>
                    {campaignCount?.Status?.New || 0} New
                  </div>*/}
                </div>
                <div className="d-flex">
                  <p className="d-flex mb-2 me-3">
                    <b>Priority:</b>
                  </p>
                  {Object.entries(priorityCounts).map(([priority, count]) => (
                    <div className="d-flex mb-2 me-3" key={priority}>
                      <span className="mdi mdi-circle align-middle text-danger me-1"></span>
                      {count} {priority}
                    </div>
                  ))}
                </div>

                {/* <div className="d-flex">
                  <p className="d-flex mb-2 me-3">
                    <b>Priority:</b>
                  </p>
                  <div className="d-flex mb-2 me-3">
                    <span className="mdi mdi-circle align-middle text-danger me-1"></span>
                    {campaignCount?.Priority?.High || 0} High
                  </div>
                  <div className="d-flex mb-2 me-3">
                    <span className="mdi mdi-circle align-middle text-warning me-1"></span>
                    {campaignCount?.Priority?.Medium || 0} Medium
                  </div>
                  <div className="d-flex mb-2 me-3">
                    <span className="mdi mdi-circle align-middle text-info me-1"></span>
                    {campaignCount?.Priority?.Low || 0} Low
                  </div>
                </div> */}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>

      {/* <Col xxl={6} sm={6}>
        <Card className="card-animate">
          <CardBody>
            <div className="table-responsive">
              <Table
                className="table-striped table-nowrap align-middle mb-0"
                style={{
                  "&.table-striped.table-nowrap.align-middle.mb-0": {
                    tbody: {
                      tr: {
                        "&.High": { backgroundColor: "#ffcccc" },
                        "&.Medium": { backgroundColor: "#ffffcc" },
                        "&.Low": { backgroundColor: "#ccffcc" },
                        "&.Total": { backgroundColor: "#ccccff" },
                      },
                      td: {
                        padding: "10px",
                        fontFamily: "Arial, sans-serif",
                      },
                    },
                  },
                }}
              >
                <thead>
                  <tr>
                    <th scope="col">Priority/Status</th>
                    <th scope="col">New</th>
                    <th scope="col">Pending</th>
                    <th scope="col">Completed</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {["High", "Medium", "Low", "Total"].map((priority) => (
                    <tr key={priority} className={priority}>
                      <td className="fw-medium">{priority}</td>
                      <td>{campaignCount[priority]?.New || 0}</td>
                      <td>{campaignCount[priority]?.Pending || 0}</td>
                      <td>{campaignCount[priority]?.Completed || 0}</td>
                      <td>{campaignCount[priority]?.Total || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col> */}
    </React.Fragment>
  );
};

export default Widgets;
