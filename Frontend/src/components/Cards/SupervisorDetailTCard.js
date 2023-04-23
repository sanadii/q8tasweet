/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from 'react-redux'
const SupervisorDetailTCard = (props) => {
    const count = useSelector(state => state.userDetail.teamCount);
    const rankList = useSelector(state => state.rank);
    const roleList = useSelector(state => state.role);
    const showCount = (type) => {
        let total = 0;
        switch (type) {
            case "total":
                count && count.map(ele => {
                    total += ele.count;
                })
                break;
            case "candidate":
                count && count.map(ele => {
                    if (ele.name === "candidate") total = ele.count
                })
                break;
            case "supervisor":
                count && count.map(ele => {
                    if (ele.name === "supervisor") total = ele.count
                })
                break;
            case "guarantor":
                count && count.map(ele => {
                    if (ele.name === "guarantor") total = ele.count
                })
                break;
            case "checker":
                count && count.map(ele => {
                    if (ele.name === "checker") total = ele.count
                })
                break;
            case "sorter":
                count && count.map(ele => {
                    if (ele.name === "sorter") total = ele.count
                })
                break;
            default:
                break;
        }
        return total;
    }
    return (
        <Card className=" user-wideget user-wideget-widget widget-user">
            <div className="widget-user-header br-te-5  br-ts-5  bg-primary">
                <h3 className="widget-user-username">
                    <a href={`${process.env.PUBLIC_URL} /elections/` + props.election_id}>
                        {props.election_title}
                    </a>
                </h3>
            </div>
            <div className="widget-user-image">
                {/* <AvatarUserComponent imagePath={props.data.avatar} /> */}
                <img alt="avatar" className="rounded-circle" src={require("../../assets/img/user.png")} />
            </div>
            <div className="user-wideget-footer text-center">
                <h4 className="fs-16 mb-0 mt-3 text-dark fw-semibold">
                    {props.data.fname + " " + props.data.lname}
                </h4>
            </div>
            <div className="user-wideget-footer">
                <h3 className="card-title mb-2">Election Title: <span>{props.election_title}</span></h3>
                <h3 className="card-title mb-2">Election Date: <span>{props.election_date}</span></h3>
                <p><strong>Team:</strong></p>
                <ul>
                    <li>
                        <strong>Candidates: </strong>
                        {showCount("candidate")}
                    </li>
                    <li>
                        <strong>Supervisors: </strong>
                        {showCount("supervisor")}
                    </li>
                    <li>
                        <strong>Guarantors: </strong>
                        {showCount("guarantor")}
                    </li>
                    <li>
                        <strong>Checkers: </strong>
                        {showCount("checker")}
                    </li>
                    <li>
                        <strong>Sorters: </strong>
                        {showCount("sorter")}
                    </li>
                </ul>
                <p><strong>User Infomation:</strong></p>
                <ul>
                    <li><strong>Name:</strong> {props.data.fname + " " + props.data.lname} </li>
                    <li><strong>Role:</strong> {roleList.data.map(ele => { if (ele.id - props.data.role === 0) { return ele.name } })} </li>
                    <li><strong>Rank:</strong> {rankList.data.map(ele => { if (ele.id - props.data.rank === 0) { return ele.name } })} </li>
                    <li><strong>Mobile:</strong> {props.data.mobile} </li>
                    <li><strong>Em@il:</strong> <a href="#">{props.data.email} </a></li></ul>
            </div>
            <a href="https://thevirtualrealitytrip.com/wp-login.php?action=logout&amp;_wpnonce=95af37bd92" className="btn btn-danger  btn-rounded">Logout</a>
        </Card>
    )
};

SupervisorDetailTCard.propTypes = {};

SupervisorDetailTCard.defaultProps = {};

export default SupervisorDetailTCard;
