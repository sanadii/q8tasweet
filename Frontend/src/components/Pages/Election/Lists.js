import React from 'react';
import { Button, Row, Col, Card, Form, FormGroup, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Pagination from '@mui/material/Pagination';
import moment from 'moment';
import { election_status } from "../../Constant/Config"
import { Tag } from 'antd';
const ElectionLists = () => {
  const columns = [
    {
      name: "No",
      selector: (row) => [row.no],
      className: 'table-column-center'
    },
    {
      name: "ID",
      title: "election_id",
      selector: (row) => [row.election_id],
      sorter: (a, b) => a.ID - b.ID > 0,
      sortable: true,
    },
    {
      name: " Title",
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
      length: 1,
      cell: (row) => (
        <Row style={{ width: "100%" }}>
          <Col lg={12}>
            {row.del_flag - 1 === 0 ? <></> : <>
              {row.status - 3 !== 0 && row.status - 4 !== 0 ?
                <label className="float-end">
                  <Tag color='red' className='table_action_button' onClick={() => deleteRow(row.id)}><i className="las la-trash" style={{ fontSize: "20px" }}></i></Tag>
                </label> : <></>}
              {row.status - 2 < 0 ?
                <label className="float-end">
                  <Tag color='green' className='table_action_button'><i onClick={() => { handleDetailShow(); setElection({ id: row.id, election_id: row.election_id, title: row.title, description: row.description, status: row.status, date: row.date, location: row.location, type: row.type, moderators: row.moderators }) }} className="las la-pen" style={{ fontSize: "20px" }}></i></Tag>
                </label> : <></>}</>}
            {/* <label className="float-end">
              <Tag color='blue' className='table_action_button'><i className="las la-clipboard" style={{ fontSize: "20px" }}></i></Tag>
            </label> */}
          </Col>
        </Row>
      )
    }
  ];
  const [show, setShow] = React.useState({ flag: false, mode: 0 });
  const [postData, setPostData] = React.useState({
    limit: 5, keyword: "", filter: "date", sorter: "desc", pagenum: 1
  });
  React.useEffect(() => {
    getData(postData);
  }, []);
  const handleClose = () => setShow({ flag: false, mode: 0 });
  const handleShow = () => setShow({ flag: true, mode: 1 });
  const handleDetailShow = () => setShow({ flag: true, mode: 2 });
  const [allData, setAllData] = React.useState({ data: [], count: 0 });
  const [election, setElection] = React.useState({
    id: 0,
    election_id: "",
    title: "",
    description: "",
    status: 0,
    date: "",
    location: "",
    type: "",
    moderators: "",
  })
  const getData = (data) => {
    fetch('http://127.0.0.1:8000/getElection/?limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum, { method: 'GET' })
      .then(response => response.json())
      .then(data => setAllData({ data: data.data, count: data.count }));
  }
  const deleteRow = (id) => {
    const data = postData
    fetch('http://127.0.0.1:8000/delElection/?id=' + id + '&limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum, { method: 'GET' })
      .then(response => response.json())
      .then(data => setAllData({ data: data.data, count: data.count }));
  }
  const addElection = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(election)
    };
    fetch('http://127.0.0.1:8000/addElection', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.code - 200 === 0) {
          getData(postData);
          handleClose();
        }
      });
  }
  const updateElection = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(election)
    };
    fetch('http://127.0.0.1:8000/updateElection', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.code - 200 === 0) {
          console.log("123123123");
          getData(postData);
          handleClose();
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
                  <Form.Control type="number" className="form-control" placeholder="election id" name="election_id" value={election.election_id} onChange={(event) => setElectionData(event)} />
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
                  <Form.Control type="date" className="form-control" id="date" placeholder="date" name="date" value={election.date} onChange={(event) => setElectionData(event)} />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Control type="text" className="form-control" id="location" placeholder="location" name="location" value={election.location} onChange={(event) => setElectionData(event)} />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Control type="text" className="form-control" id="type" placeholder="type" name="type" value={election.type} onChange={(event) => setElectionData(event)} />
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
                      defaultSortAsc={true}
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