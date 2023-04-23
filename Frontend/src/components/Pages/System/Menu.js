/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React from 'react';
import { Button, Row, Col, Card, Form, FormGroup } from "react-bootstrap";
import { backend_url } from "../../Constant/Config"
import TreeView from "deni-react-treeview";
import Swal from "sweetalert2";
const MenuLists = () => {
  React.useEffect(() => { getData(); }, []);
  const [allData, setAllData] = React.useState({ data: [] });
  const [election,] = React.useState({ id: 0, election_id: "", title: "", description: "", status: 0, date: "", location: "", type: "", moderators: "", });
  const [menu, setMenu] = React.useState({ id: 0, name: "", url: "", parent: "", parentId: 0 });
  const [status, setStatus] = React.useState({ flag: false });
  const getData = () => {
    fetch(backend_url + 'getMenu')
      .then(response => response.json())
      .then(data => {
        const menu_list = [];
        data.data.map(e => {
          if (!e.parentid) {
            const rowdata = { id: e.id, text: e.name, url: e.url, children: [] };
            data.data.map(ele => {
              if (ele.parentid - e.id === 0)
                rowdata.children.push({ id: ele.id, text: ele.name, url: ele.url, parentId: ele.parentid });
            })
            menu_list.push(rowdata);
          }
        })
        setAllData({ data: menu_list })
      });
  }
  const getDataItem = (e) => {
    if (e.parentId) {
      let paretname = "";
      allData.data.map(ele => {
        if (ele.id - e.parentId === 0) {
          paretname = ele.text;
        }
      })
      setMenu({ id: e.id, name: e.text, url: e.url, parent: paretname, parentId: e.parentid })
    } else {
      setMenu({ id: e.id, name: e.text, url: e.url, parent: "", parentId: 0 })
    }
    setStatus({ flag: false });
  }
  const addMenu = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menu)
    };
    fetch(backend_url + 'addMenu', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.code - 200 === 0) {
          getData();
        }
      });
  }
  const updateElection = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
              getData();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  }
  const deleteMenu = () => {
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
        fetch(backend_url + 'delMenu/?id=' + menu.id, { method: 'GET' })
          .then(response => response.json())
          .then(data => {
            Swal.fire("Deleted!", "Your data has been deleted.", "success");
            setAllData({ data: data.data, count: data.count })
          });
      }
    });
  }
  const setMenuData = (event) => {
    setMenu({ ...menu, [event.target.name]: event.target.value });
  }
  const setCheckMenu = () => {
    menu.parentId === 0 ? setMenu({ ...menu, parentId: 1, parent: "" }) : setMenu({ ...menu, parentId: 0, parent: "" })
  }
  const setStatusFlag = () => {
    setStatus({ flag: !status.flag });
  }
  return (
    <div>
      {/*   <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            Menu List
          </span>
        </div>
      </div>
      {/* <!-- /breadcrumb --> */}

      <Row className="row-sm">
        <Col lg={12}>
          <Card className="custom-card">
            <Card.Body>
              <Row style={{ width: "100%" }}>
                <Col lg={4}>
                  <div className="table-responsive ">
                    <span className="datatable">
                      <span className="uselistdata">
                        <TreeView
                          id="treeview"
                          style={{ height: "auto" }}
                          showIcon={false}
                          className="branch"
                          items={allData.data}
                          onSelectItem={e => getDataItem(e)}
                        />
                      </span>
                    </span>
                  </div>
                </Col>
                <Col lg={8}>
                  <Card className="custom-card">
                    <Card.Body>
                      <Form className="form-horizontal">
                        <div className="checkbox">
                          <div className="custom-checkbox custom-control">
                            <Form.Control
                              type="checkbox"
                              data-checkboxes="mygroup"
                              className="custom-control-input"
                              id="checkbox-1"
                            />
                            <Form.Label
                              htmlFor="checkbox-1"
                              className="custom-control-label mt-1"
                              onClick={setCheckMenu}
                            >
                              Submenu ?
                            </Form.Label>
                          </div>
                        </div>
                        {
                          menu.parentId === 0 ? <></> :
                            <FormGroup className="form-group">
                              <select className="form-control select2 form-select" id="parent" placeholder="parent" name="parent" value={menu.parent} onChange={(event) => setMenuData(event)}>
                                {allData.data.map(e => {
                                  return <option value={e.text} key={e.id}>{e.text}</option>
                                })}
                              </select>
                            </FormGroup>
                        }
                        <FormGroup className="form-group">
                          <Form.Control type="text" className="form-control" id="name" placeholder="menu name" name="name" value={menu.name} onChange={(event) => setMenuData(event)} />
                        </FormGroup>
                        <FormGroup className="form-group">
                          <Form.Control type="text" className="form-control" id="url" placeholder="menu url" name="url" value={menu.url} onChange={(event) => setMenuData(event)} />
                        </FormGroup>
                        <div className="checkbox">
                          <div className="custom-checkbox custom-control">
                            <Form.Control
                              type="checkbox"
                              data-checkboxes="mygroup"
                              className="custom-control-input"
                              id="checkbox-2"
                            />
                            <Form.Label
                              htmlFor="checkbox-2"
                              className="custom-control-label mt-1"
                              onClick={setStatusFlag}
                              checked={status.flag}
                            >
                              New Menu ?
                            </Form.Label>
                          </div>
                        </div>
                      </Form>
                      {status.flag - 1 === 0 ?
                        <Button variant="" className="btn ripple btn-primary" type="button" onClick={addMenu}>
                          Add Menu
                        </Button> : <>
                          <Button variant="" className="btn ripple btn-primary" type="button" onClick={updateElection}>
                            Update Menu
                          </Button> &nbsp;&nbsp;&nbsp;
                          <Button variant="" className="btn ripple btn-danger" type="button" onClick={deleteMenu}>
                            Delete Menu
                          </Button>
                        </>}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div >
  )
}

export default MenuLists;