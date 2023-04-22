/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Breadcrumb, Button, Dropdown, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import AvatarUserComponent from "../Image/AvatarUserComponent";
const CandidateCard = (props) => {
    return (
        <Card className="custom-card border">
            <Card.Body className="user-lock text-center">
                {/* <AvatarUserComponent imagePath={props.avatar} /> */}
                <img alt="avatar" className="rounded-circle" src={require("../../assets/img/user.png")} />
                <h4 className="fs-16 mb-0 mt-3 text-dark fw-semibold">
                    {props.name}
                </h4>
                <span className="text-muted">
                    {" "}
                </span>
                <div className="border-top"></div>
                <div className="my-md-auto mt-4 prof-details">
                    <p className="text-muted ms-md-4 ms-0 mb-2 mt-1">
                        <span>
                            <i className="fa fa-users me-2"></i>
                        </span>
                        <span className="font-weight-semibold me-2">Team:</span>
                        <span>{2}</span>
                    </p>
                    <p className="text-muted ms-md-4 ms-0 mb-2">
                        <span>
                            <i className="fa fa-thumbs-up me-2"></i>
                        </span>
                        <span className="font-weight-semibold me-2">Guaramtees:</span>
                        <span>{2}</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
};

CandidateCard.propTypes = {};

CandidateCard.defaultProps = {};

export default CandidateCard;
