/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { backend_url } from "../../../Constant/Config"
import DataTable from "react-data-table-component";
import Pagination from '@mui/material/Pagination';
import Select from "react-select";
import { getSupervisorDetail } from "../../../../redux/actions/userDetailAction";
const SupervisorDetail = () => {
    let { id } = useParams();
    let { userid } = useParams();
    const dispatch = useDispatch();
    const [show, setShow] = React.useState({ flag: false });
    const handleClose = () => setShow({ flag: false });
    const handleShow = () => setShow({ flag: true });
    const rankList = useSelector(state => state.rank);
    const roleList = useSelector(state => state.role);
    const userDetail = useSelector(state => state.userDetail);
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
        getSupervisorDetail({ data: postData, userid: userid }, dispatch);
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
                fetch(backend_url + 'delMyTeamId/?id=' + id, { method: 'GET' })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                        getSupervisorDetail({ data: postData, userid: userid }, dispatch);
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
        userDetail.userData && userDetail.userData.map(ele => {
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
    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })

        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    const exportToCsv = (e) => {
        e.preventDefault()

        // Headers for each column
        let headers = ['No,First Name,Last Name,Rank,Role,Mobile, Civil Id, Username']

        // Convert users data to a csv userDetail.userData
        let csvData = changeData(userDetail.userData).reduce((acc, user) => {
            const { no, fname, lname, rank, role, mobile, cid, username } = user;
            let rankStr = "";
            let roleStr = "";
            rankList.data.map(ele => {
                if (ele.id - rank === 0)
                    rankStr = ele.name;
            }, []);
            roleList.data.map(ele => {
                if (ele.id - role === 0)
                    roleStr = ele.name;
            }, []);
            acc.push([no, fname, lname, rankStr, roleStr, mobile, cid, username].join(','))
            return acc
        }, [])

        downloadFile({
            data: [...headers, ...csvData].join('\n'),
            fileName: 'supervisor.csv',
            fileType: 'text/csv',
        })
    }
    return (
        <Card className="card-primary customs-cards">
            <Card.Header className=" pb-3">
                <div className="card-title pb-0  mb-2">
                    MY TEAM
                    <div className="float-end">
                        <Button variant='' className="btn-sm btn-primary btn-rounded" onClick={handleShow}>
                            <i className="fe fe-user-plus me-1"></i> Add New User
                        </Button>
                        &nbsp;
                        <Button variant='' className="btn-sm btn-primary btn-rounded" onClick={exportToCsv}>
                            <i className="fe fe-download me-1"></i> Download
                        </Button>
                    </div>
                </div>
                <Modal show={show.flag} onHide={handleClose} >
                    <Modal.Header className="modal-header">
                        <Modal.Title>Add New User</Modal.Title>
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
                                if (checkableAdd() === true || selectedUser.id - userid === 0) {
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
                                        body: JSON.stringify({ teamid: userid, canid: selectedUser.id })
                                    };
                                    fetch(backend_url + 'addMyCandidateId', requestOptions)
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
                                data={changeData(userDetail.userData)}
                                defaultSortField="id"
                                defaultSortAsc={false}
                                pagination={false}
                                striped
                                onSort={tableAction}
                            />
                            <label className="float-end" style={{ marginTop: "5px" }}>
                                <Pagination page={postData.pagenum} count={Math.ceil(userDetail.userDataCount / postData.limit)} showFirstButton showLastButton onChange={changePagenum} />
                            </label>
                        </span>
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
}

SupervisorDetail.propTypes = {};

SupervisorDetail.defaultProps = {};

export default SupervisorDetail;
