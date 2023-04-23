/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card } from "react-bootstrap";
import moment from 'moment';
import ImageDashComponent from "../Image/ImageDashComponent";
import { backend_url } from "../Constant/Config";
const ElectionCard = (props) => {
    const [count, setCount] = React.useState({ count: 0, total: 0 })
    React.useEffect(() => {
        fetch(backend_url + 'getCountCandidate/?id=' + props.id, { method: 'GET' })
            .then(response => response.json())
            .then(data => setCount(data.data));
    }, []);
    return (
        <div>
            <Card className=" custom-card card-img-top-1">
                <a href={`${process.env.PUBLIC_URL} /elections/` + props.id}>
                    <ImageDashComponent imagePath={props.image} />
                </a>
                <Card.Body className=" pb-0">
                    <a href={`${process.env.PUBLIC_URL} /elections/` + props.id}>
                        <h4 className="card-title">{props.title}</h4>
                    </a>
                </Card.Body>
                <div className="item7-card-desc d-flex p-3 pt-0 align-items-center justify-content-center border-top">
                    <div className="ms-auto">
                        <span className="phone me-3 font-weight-semibold text-muted">
                            <span className="fe fe-user text-muted me-2 tx-16"></span>
                            {count.count}/{count.total}
                        </span>
                    </div>
                    <div className="ms-auto">
                        <span className="phone me-3 font-weight-semibold text-muted">
                            <span className="fe fe-calendar text-muted me-2 tx-16"></span>
                            {moment(props.date).format("YYYY-MM-DD")}
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    )
};

ElectionCard.propTypes = {};

ElectionCard.defaultProps = {};

export default ElectionCard;
