/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card } from "react-bootstrap";
import { backend_url } from "../Constant/Config";
const CandidateCard = (props) => {
    const [count, setCount] = React.useState();
    const [guaranteesCount, setGuaranteesCount] = React.useState({ my: 0, all: 0 });
    React.useEffect(() => {
        fetch(backend_url + 'getGuaranteesCount/?id=' + props.userid + '&eid=' + props.eid, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setGuaranteesCount(data.data);
            });
        fetch(backend_url + 'getUserTeamCount/?id=' + props.userid, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setCount(data.data);
            });
    }, []);
    const showTotalCount = (type) => {
        let total = 0;
        count && count.map(ele => {
            total += ele.count;
        })
        return total;
    }
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
                        <span>{showTotalCount("total")}</span>
                    </p>
                    <p className="text-muted ms-md-4 ms-0 mb-2">
                        <span>
                            <i className="fa fa-thumbs-up me-2"></i>
                        </span>
                        <span className="font-weight-semibold me-2">Guaramtees:</span>
                        <span>{guaranteesCount.my}</span>
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
};

CandidateCard.propTypes = {};

CandidateCard.defaultProps = {};

export default CandidateCard;
