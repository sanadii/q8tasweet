/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React from 'react';
import { Button, Row, Col, Card, Form, FormGroup, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import Pagination from '@mui/material/Pagination';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Creatable from "react-select/creatable";
import Swal from "sweetalert2";
import { backend_url } from "../../Constant/Config"
const PermissionLists = () => {
    const columns = [
        {
            name: "No",
            width: "60px",
            selector: (row) => [row.no],
            className: 'table-column-center'
        },
        {
            name: "Name",
            title: "name",
            selector: (row) => [row.name],
            sortable: true
        },
        {
            name: "Menus",
            title: "menu",
            selector: (row) => [row.menu],
            cell: (row) => (
                <span className="" style={{ width: "100%", textAlign: "end" }}>
                    <Creatable
                        classNamePrefix="background"
                        display="value"
                        value={row.menu}
                        labelledBy="Select"
                        isMulti
                        isDisabled
                    />
                </span>
            )
        },
        {
            name: "Description",
            title: "description",
            selector: (row) => [row.description]
        },
        {
            name: "Action",
            width: "100px",
            cell: (row) => (
                <span className="" style={{ width: "100%", textAlign: "end" }}>
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
            )
        }
    ];
    const [show, setShow] = React.useState({ flag: false, mode: 0 });
    const [postData, setPostData] = React.useState({ limit: 5, keyword: "", filter: "name", sorter: "desc", pagenum: 1 });
    React.useEffect(() => {
        fetch(backend_url + 'getMenu')
            .then(response => response.json())
            .then(data => {
                const menu_list = [];
                data.data.map(e => {
                    if (!e.parentid) {
                        const rowdata = { label: e.name, options: [] };
                        data.data.map(ele => {
                            if (ele.parentid - e.id === 0)
                                rowdata.options.push({ menuId: ele.id, value: ele.name, label: ele.name });
                        })
                        menu_list.push(rowdata);
                    }
                })
                setMenuList({ data: menu_list })
            });
        getData(postData);
    }, []);
    const handleClose = () => setShow({ flag: false, mode: 0 });
    const handleShow = () => setShow({ flag: true, mode: 1 });
    const handleDetailShow = () => setShow({ flag: true, mode: 2 });
    const [allData, setAllData] = React.useState({ data: [], count: 0 });
    const [dataValue, setDataValue] = React.useState({ id: 0, name: "", menu: "", description: "" })
    const [menuList, setMenuList] = React.useState({ data: [] });
    const getData = (data) => {
        fetch(backend_url + 'getPermission/?limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum, { method: 'GET' })
            .then(response => response.json())
            .then(async data => {
                const set_data = [];
                await data.data.map(async e => {
                    let set_Data_row = e;
                    set_Data_row.menu = [];
                    await data.menu.map(ele => {
                        if (ele.permissionid - e.id === 0)
                            set_Data_row.menu.push({ menuId: ele.menuid, value: ele.value, label: ele.label });
                    })
                    set_data.push(set_Data_row);
                })
                setAllData({ data: set_data, count: data.count })
            });
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
                fetch(backend_url + 'delPermission/?id=' + id + '&limit=' + data.limit + '&keyword=' + data.keyword + '&filter=' + data.filter + '&sorter=' + data.sorter + '&pagenum=' + data.pagenum, { method: 'GET' })
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
        setDataValue({ id: row.id, name: row.name, description: row.description, menu: row.menu })
    }
    const addData = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataValue)
        };
        fetch(backend_url + 'addPermission', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.code - 200 === 0) {
                    getData(postData);
                    handleClose();
                }
            });
    }
    const updateData = () => {
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
                    body: JSON.stringify(dataValue)
                };
                fetch(backend_url + 'updatePermission', requestOptions)
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
    const setPropsValue = (event) => {
        setDataValue({ ...dataValue, [event.target.name]: event.target.value });
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
                        Permission List
                    </span>
                </div>
                <div className="justify-content-center mt-2">
                    <Link className="btn me-2 btn-rounded btn-outline-primary" to="#" onClick={() => { handleShow(); setDataValue({ id: 0, name: "", menu: "", description: "" }) }}><i className="fe fe-plus me-2"></i>Add New Permission</Link>
                    <Modal show={show.flag} onHide={handleClose}>
                        <Modal.Header className="modal-header">
                            {show.mode - 1 === 0 ?
                                <h6 className="modal-title">Add New Permission</h6> :
                                <h6 className="modal-title">Update Permission</h6>}
                            <Button variant="" className="btn-close" type="button" onClick={handleClose}>
                                <span aria-hidden="true">×</span></Button>
                        </Modal.Header>
                        <Modal.Body className="modal-body"> <div className="p-4">
                            <Form className="form-horizontal">
                                <FormGroup className="form-group">
                                    <Form.Control type="text" className="form-control" id="name" placeholder="name" name="name" value={dataValue.name} onChange={(event) => setPropsValue(event)} />
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Form.Control type="text" className="form-control" id="description" placeholder="description" name="description" value={dataValue.description} onChange={(event) => setPropsValue(event)} />
                                </FormGroup>
                                <FormGroup className="form-group">
                                    <Creatable
                                        classNamePrefix="background"
                                        display="value"
                                        options={menuList.data}
                                        value={dataValue.menu}
                                        onChange={(value) => { setDataValue({ ...dataValue, menu: value }) }}
                                        labelledBy="Select"
                                        isMulti
                                    />
                                </FormGroup>
                            </Form>
                        </div>
                        </Modal.Body>
                        <Modal.Footer>
                            {show.mode - 1 === 0 ?
                                <Button variant="" className="btn ripple btn-primary" type="button" onClick={addData}>
                                    Add
                                </Button> :
                                <Button variant="" className="btn ripple btn-primary" type="button" onClick={updateData}>
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
                                            <input type="text" placeholder="Name Search..." className="mb-4 form-control-sm form-control" onChange={changeKeyword} />
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
export default PermissionLists;