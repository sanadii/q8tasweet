/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React from 'react';
import { Button, Row, Col, Card, Form, FormGroup, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Pagination from '@mui/material/Pagination';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from 'moment';
import { Tag } from 'antd';
import Swal from "sweetalert2";
import Dropzone from "react-dropzone";
import ImageTableComponent from '../../Image/ImageTableComponent';
import ImageDashComponent from '../../Image/ImageDashComponent';
import { election_status, backend_url } from "../../Constant/Config"
const ElectionLists = () => {
  const columns = [
    {
      name: "No",
      width: "60px",
      selector: (row) => [row.no],
      className: 'table-column-center'
    },
    {
      name: "",
      title: "image",
      selector: (row) => [row.image],
      cell: row => {
        return <ImageTableComponent imagePath={row.image} />
      }
    },
    {
      name: "Title",
      title: "title",
      selector: (row) => [row.title],
      sortable: true
    },
    {
      name: "Status",
      title: "status",
      selector: (row) => [row.status],
      cell: row => {
        if (row.del_flag - 1 === 0) {
          return <Tag color='red'>deleted</Tag>
        } else {
          return election_status.map(e => {
            if (e.key - row.status === 0) {
              return <Tag key={e.key} color={e.color}>{e.value}</Tag>
            }
          })
        }
      },
      sortable: true
    },
    {
      name: "Date",
      title: "date",
      selector: (row) => [row.date],
      sortable: true,
      cell: row => <div>{moment(row.date).format("MM-DD-YYYY A")}</div>,
    },
    {
      name: "Location",
      title: "location",
      selector: (row) => [row.location],
      sortable: true
    },
    {
      name: "Type",
      title: "type",
      selector: (row) => [row.type],
      textAlign: 'center',
      sortable: true
    },
    {
      name: "Action",
      width: "100px",
      cell: (row) => (
        <span className="" style={{ width: "100%", textAlign: "end" }}>
          {
            row.del_flag - 1 === 0 ?
              <></>
              :
              <>
                {
                  row.status - 3 < 0 ?
                    <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                      <Link to="#" className="btn btn-primary btn-sm rounded-11 me-2" onClick={() => editRow(row)} >
                        <i>
                          <svg
                            className="table-edit"
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            viewBox="0 0 24 24"
                            width="16"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM5.92 19H5v-.92l9.06-9.06.92.92L5.92 19zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41z" />
                          </svg>
                        </i>
                      </Link>
                    </OverlayTrigger>
                    :
                    <></>
                }
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
              </>
          }
        </span >
      )
    }
  ];
  const [show, setShow] = React.useState({ flag: false, mode: 0 });
  const [postData, setPostData] = React.useState({ limit: 5, keyword: "", filter: "date", sorter: "desc", pagenum: 1 });
  React.useEffect(() => {
    getData(postData);
  }, []);
  const handleClose = () => setShow({ flag: false, mode: 0 });
  const handleShow = () => setShow({ flag: true, mode: 1 });
  const handleDetailShow = () => setShow({ flag: true, mode: 2 });
  const [allData, setAllData] = React.useState({ data: [], count: 0 });
  const [election, setElection] = React.useState({ id: 0, image: "", title: "", description: "", status: 0, date: "", location: "", type: "", moderators: "" })
  const getData = (data) => {
    fetch(backend_url + 'getElection/?limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum, { method: 'GET' })
      .then(response => response.json())
      .then(data => setAllData({ data: data.data, count: data.count }));
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
        fetch(backend_url + 'delElection/?id=' + id + '&limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum, { method: 'GET' })
          .then(response => response.json())
          .then(data => {
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            setAllData({ data: data.data, count: data.count })
          });
      }
    });
  }
  const editRow = (row) => {
    handleDetailShow();
    setElection({ id: row.id, image: row.image, title: row.title, description: row.description, status: row.status, date: row.date, location: row.location, type: row.type, moderators: row.moderators })
  }
  const addElection = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(election)
    };
    fetch(backend_url + 'addElection', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.code - 200 === 0) {
          getData(postData);
          handleClose();
        }
      });
  }
  const updateElection = () => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You update this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(election)
        };
        fetch(backend_url + 'updateElection', requestOptions)
          .then(response => response.json())
          .then(data => {
            if (data.code - 200 === 0) {
              getData(postData);
              Swal.fire("Update!", "Your data has been updated.", "success");
            }
          });
      }
    });
  }
  const setElectionData = (event) => {
    setElection({ ...election, [event.target.name]: event.target.value });
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
  const changeKeyword = (event) => {
    setPostData({ ...postData, keyeword: event.target.value, pagenum: 1 });
    let data = postData;
    data.keyword = event.target.value;
    data.pagenum = 1;
    getData(data);
  }
  const changePagenum = (event, value) => {
    setPostData({ ...postData, pagenum: value });
    let data = postData;
    data.pagenum = value;
    getData(data);
  }
  const tableAction = (sortBy, sortDirection) => {
    setPostData({ ...postData, filter: columns[sortBy.id - 1].title, sorter: sortDirection, pagenum: 1 });
    let data = postData;
    data.filter = columns[sortBy.id - 1].title;
    data.sorter = sortDirection;
    data.pagenum = 1;
    getData(data);
  };
  const upLoadImage = (imageData) => {
    const formData = new FormData();
    formData.append("image", imageData);
    fetch(backend_url + 'upLoadImage', {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setElection({ ...election, image: data.url })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  const handleImageChange = (event) => {
    upLoadImage(event[0]);
  };
  return (
    <div>
      {/*   <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            Election List
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Link className="btn me-2 btn-rounded btn-outline-primary" to="#" onClick={handleShow}><i className="fe fe-plus me-2"></i>Add New Election</Link>
          <Modal show={show.flag} onHide={handleClose}>
            <Modal.Header className="modal-header">
              {show.mode - 1 === 0 ?
                <h6 className="modal-title">Add New Election</h6> :
                <h6 className="modal-title">Update Election</h6>}
              <Button variant="" className="btn-close" type="button" onClick={handleClose}>
                <span aria-hidden="true">×</span></Button>
            </Modal.Header>
            <Modal.Body className="modal-body"> <div className="p-4">
              <Form className="form-horizontal">
                <FormGroup className="form-group">
                  <Dropzone onDrop={(event) => { handleImageChange(event); }}>
                    {({ getRootProps, getInputProps }) => (
                      <div className="dropzone dz-clickable">
                        <div className="dz-message needsclick" {...getRootProps()}>
                          {
                            election.image ?
                              <ImageDashComponent imagePath={election.image} />
                              :
                              <img src={require("../../../assets/img/defaultImage.png")} alt="Responsive" className="card-img-top w-100" style={{ height: "200px" }}></img>
                          }
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Control type="text" className="form-control" id="title" placeholder="title" name="title" value={election.title} onChange={(event) => setElectionData(event)} />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Control type="text" className="form-control" id="description" placeholder="description" name="description" value={election.description} onChange={(event) => setElectionData(event)} />
                </FormGroup>
                {
                  show.mode - 2 === 0 ?
                    <FormGroup className="form-group">
                      <select className="form-control select2 form-select" id="status" placeholder="status" name="status" value={election.status} onChange={(event) => setElectionData(event)}>
                        {election_status.map(e => {
                          return <option value={e.key} key={e.key}>{e.value}</option>
                        })}
                      </select>
                    </FormGroup> : <></>
                }
                <FormGroup className="form-group">
                  <Form.Control type="date" className="form-control" id="date" placeholder="date" name="date" value={moment(election.date).format("YYYY-MM-DD")} onChange={(event) => setElectionData(event)} />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Control type="text" className="form-control" id="location" placeholder="location" name="location" value={election.location} onChange={(event) => setElectionData(event)} />
                </FormGroup>
                <FormGroup className="form-group">
                  <select
                    className="form-control"
                    placeholder="Election Location"
                    id="type"
                    name="type"
                    value={election.type}
                    onChange={(event) => setElectionData(event)}
                  >
                    <option value="">-- Select an option --</option>
                    <option value="parties">Party Only</option>
                    <option value="candidates">Candidate Only</option>
                    <option value="both">Both Parties and Candidates</option>
                  </select>
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Control type="text" className="form-control" id="moderators" placeholder="moderators" name="moderators" value={election.moderators} onChange={(event) => setElectionData(event)} />
                </FormGroup>
              </Form>
            </div>
            </Modal.Body>
            <Modal.Footer>
              {show.mode - 1 === 0 ?
                <Button variant="" className="btn ripple btn-primary" type="button" onClick={addElection}>
                  Add
                </Button> :
                <Button variant="" className="btn ripple btn-primary" type="button" onClick={updateElection}>
                  Update
                </Button>}
              <Button variant="" className="btn ripple btn-secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      {/* <!-- /breadcrumb --> */}

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
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
                      <input type="text" placeholder="Title Search..." className="mb-4 form-control-sm form-control" onChange={changeKeyword} />
                    </label>
                    <DataTable
                      columns={columns}
                      data={changeData(allData.data)}
                      defaultSortField="ID"
                      striped
                      defaultSortAsc={false}
                      pagination={false}
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
      </Row>
    </div >
  )
}
export default ElectionLists;