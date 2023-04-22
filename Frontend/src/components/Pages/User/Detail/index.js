/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Col, Breadcrumb, Row, ProgressBar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from 'react-redux';
import { backend_url } from "../../../Constant/Config"
import CandidateDetail from "./CandidateDetail";
import SupervisorDetail from "./SupervisorDetail";
import GuanatorDetail from "./GuanatorDetail";
import CandidateDetailTCard from "../../../Cards/CandidateDetailTCard";
import SupervisorDetailTCard from "../../../Cards/SupervisorDetailTCard";
import GuanatorDetailTCard from "../../../Cards/GuanatorDetailTCard";
// import { Breadcrumb, Card, Carousel, Col, ProgressBar, Row } from 'react-bootstrap';
const UserDetailIndex = () => {
    let { id } = useParams();
    let { userid } = useParams();
    const rankList = useSelector(state => state.rank);
    const roleList = useSelector(state => state.role);
    const [electionData, setElectionData] = React.useState({ id: id, title: "", description: "", location: "", date: "", type: "", image: "" });
    const [userData, setUserData] = React.useState({ id: userid });
    const [teamcount, setTeamCount] = React.useState();
    const [guaranteesCount, setGuaranteesCount] = React.useState({ my: 0, all: 0 });
    const [postData, setPostData] = React.useState({ limit: 5, keyword: "", filter: "id", sorter: "desc", pagenum: 1 });
    const [allData, setAllData] = React.useState({ data: [], count: 0 });
    const [allUser, setAllUser] = React.useState(null);
    const [selectedUser, setSelectedUser] = React.useState();
    React.useEffect(() => {
        const fetchData = async () => {
            await fetch(backend_url + 'getElectionId/?id=' + id, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setElectionData(data.data);
                });
            await fetch(backend_url + 'getUserElection/?id=' + id, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setAllUser(data.data);
                });
            await fetch(backend_url + 'getGuaranteesCount/?id=' + userid + '&eid=' + id, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setGuaranteesCount(data.data);
                });
            await fetch(backend_url + 'getUserId/?id=' + userid, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setUserData(data.data)
                });
            await fetch(backend_url + 'getUserTeamCount/?id=' + userid, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    setTeamCount(data.data);
                });
            getData(postData);
        };
        fetchData().catch(err => console.log(err));
    }, [])
    const getData = (data) => {
        fetch(backend_url + 'getMyTeamId/?limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum + '&userid=' + userid, { method: 'GET' })
            .then(response => response.json())
            .then(async data => {
                setAllData({ data: data.data, count: data.count })
            });
    }
    const showCount = (type) => {
        let total = 0;
        switch (type) {
            case "total":
                teamcount && teamcount.map(ele => {
                    total += ele.count;
                })
                break;
            case "supervisor":
                teamcount && teamcount.map(ele => {
                    if (ele.name === "supervisor") total = ele.count
                })
                break;
            case "guarantor":
                teamcount && teamcount.map(ele => {
                    if (ele.name === "guarantor") total = ele.count
                })
                break;
            case "checker":
                teamcount && teamcount.map(ele => {
                    if (ele.name === "checker") total = ele.count
                })
                break;
            case "sorter":
                teamcount && teamcount.map(ele => {
                    if (ele.name === "sorter") total = ele.count
                })
                break;
            default:
                break;
        }
        return total;
    }
    return (
        <div>
            {/* <!-- breadcrumb --> */}
            <div className="breadcrumb-header justify-content-between">
                <div className="left-content">
                    <span className="main-content-title mg-b-0 mg-b-lg-1">{userData.fname + " " + userData.lname}</span>
                </div>
                <div className="justify-content-center mt-2">
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-item tx-15" href="#">
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            className="breadcrumb-item "
                            active
                            aria-current="page"
                        >
                            Elections
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            className="breadcrumb-item "
                            active
                            aria-current="page"
                        >
                            {electionData.title}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            className="breadcrumb-item "
                            active
                            aria-current="page"
                        >
                            {userData.fname + " " + userData.lname}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            {/* <!-- /breadcrumb --> */}

            <Row>
                <Col lg={12} md={12} xl={9} sm={12}>
                    {userData.rank - 2 !== 0
                        ?
                        <></>
                        :
                        <Row className="row-cards row-deck">
                            <Col sm={12} lg={6}>
                                <Card>
                                    <Card.Header className=" pb-0">
                                        <div className="card-title pb-0  mb-2">TEAM</div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <div className="col text-center">
                                                <label className="tx-12">Team Members</label>
                                                <p className="font-weight-bold tx-20">{showCount("total")}</p>
                                            </div>{" "}
                                            {/*<!-- col --> */}
                                            <div className="col border-start text-center">
                                                <label className="tx-12">Supervisors</label>
                                                <p className="font-weight-bold tx-20">{showCount("supervisor")}</p>
                                            </div>
                                            {/* <!-- col --> */}
                                            <div className="col border-start text-center">
                                                <label className="tx-12">Guarantors</label>
                                                <p className="font-weight-bold tx-20">{showCount("guarantor")}</p>
                                            </div>
                                            {/* <!-- col --> */}
                                        </Row>
                                        {/*<!-- row --> */}
                                        <div className="mt-4">
                                            <p className="mb-1">Days to the election</p>
                                            <div className="progress ht-20">
                                                <ProgressBar
                                                    animated
                                                    now={50}
                                                    variant="primary"
                                                    label="50%"
                                                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary ht-20 w-50"
                                                >
                                                    50%
                                                </ProgressBar>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12} lg={6}>
                                <Card>
                                    <Card.Header className=" pb-0">
                                        <div className="card-title pb-0 mb-2">GUARANTEES LIST</div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <div className="col text-center">
                                                <label className="tx-12">My Guarantees</label>
                                                <p className="font-weight-bold tx-20">{guaranteesCount.my}</p>
                                            </div>
                                            {/* <!-- col --> */}
                                            <div className="col border-start text-center ">
                                                <label className="tx-12">All Guarantees</label>
                                                <p className="font-weight-bold tx-20">{guaranteesCount.all}</p>
                                            </div>{" "}
                                            {/* <!-- col --> */}
                                            <div className="col border-start text-center">
                                                <label className="tx-12">Target</label>
                                                <p className="font-weight-bold tx-20">36</p>
                                            </div>
                                            {/* <!-- col --> */}
                                        </Row>
                                        {/* <!-- row --> */}
                                        <div className="mt-4">
                                            <p className="mb-1">Target Guarantees</p>
                                            <div className="progress ht-20">
                                                <ProgressBar
                                                    animated
                                                    now={60}
                                                    variant="primary"
                                                    label="60%"
                                                    className="progress-bar progress-bar-striped progress-bar-animated bg-warning wd-70p ht-20"
                                                >
                                                    36%
                                                </ProgressBar>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    }
                    {userData.rank - 2 === 0
                        ?
                        <CandidateDetail />
                        : <>
                            {
                                userData.rank - 3 === 0
                                    ?
                                    <SupervisorDetail />
                                    : <>
                                        {
                                            userData.rank - 4 === 0
                                                ?
                                                <GuanatorDetail />
                                                : <></>
                                        }
                                    </>
                            }
                        </>
                    }
                </Col>
                <Col xl={3} lg={12} md={12} sm={12}>
                    <Col xl={12} lg={12}>
                        {userData.rank - 2 === 0
                            ?
                            <CandidateDetailTCard data={userData} teamcount={teamcount} election_title={electionData.title} election_date={electionData.date} />
                            : <>
                                {
                                    userData.rank - 3 === 0
                                        ?
                                        <SupervisorDetailTCard data={userData} teamcount={teamcount} election_title={electionData.title} election_date={electionData.date} />
                                        : <>
                                            {
                                                userData.rank - 4 === 0
                                                    ?
                                                    <GuanatorDetailTCard data={userData} teamcount={teamcount} election_title={electionData.title} election_date={electionData.date} />
                                                    : <></>
                                            }
                                        </>
                                }
                            </>
                        }
                    </Col>
                </Col>
            </Row>

            {/* <!-- Row --> */}
            <Row className=" row-sm">
                <Col lg={12} md={12}>
                    <div className="tab-content"></div>
                    {/* </div> */}
                </Col>
            </Row>
            {/* <!-- row closed --> */}
        </div >
    );
}

UserDetailIndex.propTypes = {};

UserDetailIndex.defaultProps = {};

export default UserDetailIndex;
