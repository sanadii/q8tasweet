/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from 'react-redux'
const GuanatorDetailTCard = (props) => {
    const rankList = useSelector(state => state.rank);
    const roleList = useSelector(state => state.role);
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

GuanatorDetailTCard.propTypes = {};

GuanatorDetailTCard.defaultProps = {};

export default GuanatorDetailTCard;
