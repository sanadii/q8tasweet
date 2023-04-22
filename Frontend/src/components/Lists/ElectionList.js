/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from 'moment';
import AvatarDashComponent from "../Image/AvatarDashComponent";
const ElectionList = (props) => {
    return (
        <>
            <a href={`${process.env.PUBLIC_URL} /elections/` + props.id}>
                <AvatarDashComponent imagePath={props.image} />
            </a>
            <div className="">
                <span className="d-block">{moment(props.date).format("MM-DD-YYYY A")}</span>
                <a className="text-default fs-16 font-weight-semibold" href={`${process.env.PUBLIC_URL} /elections/` + props.id}>{props.title}</a>
                <small className="d-block text-muted">{props.status}</small>
            </div>
        </>
    )
};

ElectionList.propTypes = {};

ElectionList.defaultProps = {};

export default ElectionList;
