import React from 'react';
import {  Card,Breadcrumb, Col, Row } from 'react-bootstrap';
import { BasicTable } from '../../Tables/BasicTable';
const MenuLists = () => (
  <div>
    <div className="main-container container-fluid">
      {/*   <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            Menu Management
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
              System Management
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item "
              active
              aria-current="page"
            >
              Menu
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      {/* <!-- /breadcrumb --> */}

      {/* <!-- Row --> */}
      <Row className=" row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              <div>
                <h6 className="main-content-label mb-1">
                  MenuLists
                </h6>
              </div>
              <div className="table-responsive fileexport pos-relative">
                <BasicTable />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
);

MenuLists.propTypes = {};

MenuLists.defaultProps = {};

export default MenuLists;
