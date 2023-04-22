/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { Card, Col, Dropdown, Breadcrumb, Nav, Row, Tab, FormGroup, Form, Button, ProgressBar, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import moment from 'moment';
import Swal from "sweetalert2";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { TextareaAutosize } from "@mui/material";
import { images } from "../../components/Pages/Gallery/data";
import CandidateCard from "../Cards/CandidateCard";
import { backend_url } from "../Constant/Config"
import ImageDashComponent from "../Image/ImageDashComponent";
import CandidateDetailTCard from "../Cards/CandidateDetailTCard";
import DataTable from "react-data-table-component";
import Pagination from '@mui/material/Pagination';
import Creatable from "react-select/creatable";
import Select from "react-select";
// import { Breadcrumb, Card, Carousel, Col, ProgressBar, Row } from 'react-bootstrap';
const ElectionUserDetail = () => {
    let { id } = useParams();
    let { userid } = useParams();
    const [show, setShow] = React.useState({ flag: false });
    const handleClose = () => setShow({ flag: false });
    const handleShow = () => setShow({ flag: true });
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
    const candidateColums = [
        {
            name: "Name",
            cell: (row) => (
                <span>
                    <p className="tx-14 font-weight-semibold text-dark mb-1"><a href="#" onClick={() => goToUser(row)} className="pointer_action_button">{row.fname + " " + row.lname}</a></p>
                    <p className="tx-12 text-muted mb-0">{row.email}</p>
                </span>
            ),
        },
        {
            name: "Rank",
            title: "rank",
            selector: (row) => [row.rank],
            cell: (row) => {
                return rankList.data.map(ele => {
                    if (ele.id - row.rank === 0)
                        return ele.name;
                })
            },
            sortable: true
        },
        {
            name: "Role",
            title: "role",
            cell: (row) => {
                return roleList.data.map(ele => {
                    if (ele.id - row.role === 0)
                        return ele.name;
                })
            },
            sortable: true
        },
        {
            name: "Mobile Number",
            title: "mobile",
            sortable: true,
            selector: (row) => [row.mobile]
        },
        {
            name: "Civil Id Number",
            title: "cid",
            sortable: true,
            selector: (row) => [row.cid]
        },
        {
            name: "Username",
            title: "username",
            sortable: true,
            selector: (row) => [row.username]
        },
        {
            name: "",
            width: "50px",
            cell: (row) => (
                <span className="" style={{ width: "100%", textAlign: "end" }}>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>} >
                        <Link to="#" className="btn btn-danger btn-sm rounded-11" onClick={() => deleteRow(row.id)}>
                            <i>
                                <svg
                                    className="table-delete"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    width="16"
                                >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
                                </svg>
                            </i>
                        </Link>
                    </OverlayTrigger>
                </span >
            ),
        },
    ]
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
    const changeData = (data) => {
        let resultData = [];
        if (data)
            data.map((e, index) => {
                let e_data = e;
                e_data.no = index + postData.limit * (postData.pagenum - 1) + 1;
                resultData.push(e_data);
            })
        return resultData;
    }
    const changeLimit = (event) => {
        setPostData({ ...postData, limit: event.target.value, pagenum: 1 });
        let data = postData;
        data.limit = event.target.value;
        data.pagenum = 1;
        getData(data);
    }
    const changePagenum = (event, value) => {
        setPostData({ ...postData, pagenum: value });
        let data = postData;
        data.pagenum = value;
        getData(data);
    }
    const changeKeyword = (event) => {
        setPostData({ ...postData, keyeword: event.target.value, pagenum: 1 });
        let data = postData;
        data.keyword = event.target.value;
        data.pagenum = 1;
        getData(data);
    }
    const deleteRow = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const data = postData
                fetch(backend_url + 'delMyTeamId/?id=' + id + '&limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum + '&userid=' + userid, { method: 'GET' })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                        setAllData({ data: data.data, count: data.count })
                    });
            }
        });
    }
    const tableAction = (sortBy, sortDirection) => {
        setPostData({ ...postData, filter: candidateColums[sortBy.id - 1].title, sorter: sortDirection, pagenum: 1 });
        let data = postData;
        data.filter = candidateColums[sortBy.id - 1].title;
        data.sorter = sortDirection;
        data.pagenum = 1;
        getData(data);
    };
    const changeOption = (data) => {
        const options = []
        if (data !== null)
            data.map(ele => {
                let option = ele;
                ele.value = ele.fname + " " + ele.lname;
                ele.label = ele.fname + " " + ele.lname;
                options.push(option);
            })
        return options;
    };
    const changeNameAdd = (value) => {
        setSelectedUser(value);
    };
    const checkableAdd = () => {
        let a = 0;
        allData.data && allData.data.map(ele => {
            if (ele.fname === selectedUser.fname && ele.lname === selectedUser.lname && ele.email === selectedUser.email && ele.cid - selectedUser.cid === 0) {
                a = 1;
            }
        })
        console.log(a)
        return a === 1 ? true : false
    };
    const goToUser = (row) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(row)
        };
        fetch(backend_url + 'getIdUser', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                window.location.href = `${process.env.PUBLIC_URL}/elections/` + id + `/` + data.data;
            });
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
                    <Card className="card-primary customs-cards">
                        <Card.Header className=" pb-3">
                            <div className="card-title pb-0  mb-2">
                                MY TEAM
                                <div className="float-end">
                                    <Button variant='' className="btn-sm btn-primary btn-rounded" onClick={handleShow}>
                                        <i className="fe fe-user-plus me-1"></i> Add New
                                    </Button>
                                    &nbsp;
                                    <Button variant='' className="btn-sm btn-primary btn-rounded">
                                        <i className="fe fe-download me-1"></i> Download
                                    </Button>
                                </div>
                            </div>
                            <Modal show={show.flag} onHide={handleClose} >
                                <Modal.Header className="modal-header">
                                    <Modal.Title>Add New Team Member</Modal.Title>
                                    <Button variant="" className="btn btn-close" onClick={handleClose}>
                                        x
                                    </Button>
                                </Modal.Header>
                                <Modal.Body className="modal-body">
                                    <h6></h6>
                                    <div className=" SlectBox">
                                        <Select
                                            value={selectedUser}
                                            onChange={changeNameAdd}
                                            options={changeOption(allUser)}
                                            placeholder="Select Name"
                                            classNamePrefix="selectform"
                                        />
                                    </div>
                                    <div>
                                        {selectedUser ?
                                            <>
                                                <div>email   :{selectedUser.email}</div>
                                                <div>mobile  :{selectedUser.mobile}</div>
                                                <div>civid id:{selectedUser.cid}</div>
                                            </> : <></>
                                        }

                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant=""
                                        className="btn ripple btn-primary"
                                        type="button"
                                        onClick={() => {
                                            if (checkableAdd() === true) {
                                                handleClose();
                                                Swal.fire({
                                                    title: "Add Warning",
                                                    allowOutsideClick: false,
                                                    icon: "warning",
                                                    confirmButtonText: "ok",
                                                    cancelButtonColor: "#38cab3",
                                                    text: "He (She) is already in your team",
                                                });
                                            } else {
                                                const requestOptions = {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ canid: userid, teamid: selectedUser.id })
                                                };
                                                fetch(backend_url + 'addMyTeamId', requestOptions)
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        if (data.code - 200 === 0) {
                                                            getData(postData);
                                                            handleClose();
                                                            Swal.fire("Add!", "Add new member successfully", "success");
                                                        }
                                                    });
                                            }
                                        }}
                                    >
                                        Add Member
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Card.Header>
                        <Card.Body className=" d-md-flex bg-white">
                            <div className="table-responsive ">
                                <span className="datatable">
                                    <span className="uselistdata">
                                        <label className="float-first">
                                            <select className="form-control select form-select" defaultValue={"5"} onChange={changeLimit}>
                                                <option value="5" >5&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                                <option value="10">10&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                                <option value="20">20&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                                <option value="50">50&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                            </select>
                                        </label>
                                        <label className="float-end">
                                            <input type="text" placeholder="Name, Mobile, Civil id number Search..." className="mb-4 form-control-sm form-control" onChange={changeKeyword} style={{ width: "400px" }} />
                                        </label>
                                        <DataTable
                                            columns={candidateColums}
                                            data={changeData(allData.data)}
                                            defaultSortField="id"
                                            defaultSortAsc={false}
                                            pagination={false}
                                            striped
                                            onSort={tableAction}
                                        />
                                        <label className="float-end" style={{ marginTop: "5px" }}>
                                            <Pagination page={postData.pagenum} count={Math.ceil(allData.count / postData.limit)} showFirstButton showLastButton onChange={changePagenum} />
                                        </label>
                                    </span>
                                </span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={3} lg={12} md={12} sm={12}>
                    <Col xl={12} lg={12}>
                        <CandidateDetailTCard data={userData} teamcount={teamcount} election_title={electionData.title} election_date={electionData.date} />
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

ElectionUserDetail.propTypes = {};

ElectionUserDetail.defaultProps = {};

export default ElectionUserDetail;
