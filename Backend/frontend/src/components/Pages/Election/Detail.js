/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Card, Col, Dropdown, Breadcrumb, Nav, Row, Tab, FormGroup, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import CandidateCard from "../../Cards/CandidateCard";
import { backend_url } from "../../Constant/Config"
import ImageDashComponent from "../../Image/ImageDashComponent";
const ElectionsDetail = () => {
    let { id } = useParams();
    const [electionData, setElectionData] = React.useState({ id: id, title: "", description: "", location: "", date: "", type: "", image: "" });
    const [electionUpData, setElectionUpData] = React.useState({ id: id, title: "", description: "", location: "", date: "", type: "", image: "" });
    const [candidateData, setCandidateData] = React.useState();
    const [count, setCount] = React.useState({ users: 0, guarantees: 0, others: 0 });
    React.useEffect(() => {
        fetch(backend_url + 'getElectionId/?id=' + id, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setElectionData(data.data);
                setElectionUpData(data.data)
            });
        fetch(backend_url + 'getElectionCandidate/?id=' + id, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setCandidateData(data.data)
            });
        fetch(backend_url + 'getElectionCount/?id=' + id, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setCount(data.data)
            });

    }, [])
    const setElectionValue = (event) => {
        setElectionUpData({ ...electionUpData, [event.target.name]: event.target.value });
    }
    const upLoadImage = (imageData) => {
        const formData = new FormData();
        formData.append("image", imageData);
        fetch(backend_url + 'upLoadImage', {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                setElectionUpData({ ...electionUpData, image: data.url })
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    const handleImageChange = (event) => {
        upLoadImage(event[0]);
    };
    const updatePost = () => {
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
                    body: JSON.stringify(electionUpData)
                };
                fetch(backend_url + 'updateElection', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.code - 200 === 0) {
                            Swal.fire("Update!", "Your data has been updated.", "success");
                            setElectionData(electionUpData);
                        }
                    });
            }
        })
    }
    return (
        <div>
            {/* <!-- breadcrumb --> */}
            <div className="breadcrumb-header justify-content-between">
                <div className="left-content">
                    <span className="main-content-title mg-b-0 mg-b-lg-1">{electionData.title}</span>
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
                    </Breadcrumb>
                </div>
            </div>
            {/* <!-- /breadcrumb --> */}

            <Row>
                <Col lg={12} md={12} xl={9} sm={12}>
                    <Card className="custom-card customs-cards">
                        <Card.Body className=" d-md-flex bg-white">
                            <div className="">
                                <span className="profile-image pos-relative">
                                    <ImageDashComponent imagePath={electionData.image} />
                                    <span className="bg-success text-white wd-1 ht-1 rounded-pill profile-online"></span>
                                </span>
                            </div>
                            <div className="my-md-auto mt-4 prof-details">
                                <h4 className="font-weight-semibold ms-md-4 ms-0 mb-1 pb-0">
                                    {electionData.title}
                                </h4>
                                <p className="tx-13 text-muted ms-md-4 ms-0 mb-2 pb-2 ">
                                </p>
                                <p className="text-muted ms-md-4 ms-0 mb-2">
                                    <span>
                                        <i className="fa fa-calendar me-2"></i>
                                    </span>
                                    <span className="font-weight-semibold me-2">Date:</span>
                                    <span>{moment(electionData.date).format("YYYY-MM-DD")}</span>
                                </p>
                                <p className="text-muted ms-md-4 ms-0 mb-2">
                                    <span>
                                        <i className="fa fa-map-pin me-2"></i>
                                    </span>
                                    <span className="font-weight-semibold me-2">Location:</span>
                                    <span>{electionData.location}</span>
                                </p>
                                <p className="text-muted ms-md-4 ms-0 mb-2">
                                    <span>
                                        <i className="fa fa-user me-2"></i>
                                    </span>
                                    <span className="font-weight-semibold me-2">Moderator:</span>
                                    <span>{electionData.moderators}</span>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                    <span className=" py-0 ">
                        <div className="profile-tab tab-menu-heading border-bottom-0 ">
                            <Tab.Container id="left-tabs-example" defaultActiveKey="Candidates">
                                <Nav
                                    variant="pills"
                                    className="nav profile-tabs main-nav-line tabs-menu profile-nav-line bg-white mb-4 border-0 br-5 mb-0	"
                                >
                                    <Nav.Item className="me-1">
                                        <Nav.Link className=" mb-2 mt-2" eventKey="Candidates">
                                            Candidates
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="me-1">
                                        <Nav.Link className="mb-2 mt-2" eventKey="Activities">
                                            Activities
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="me-1">
                                        <Nav.Link className="mb-2 mt-2" eventKey="Settings">
                                            Settings
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="me-1">
                                        <Nav.Link className="mb-2 mt-2" eventKey="Users">
                                            Users
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Row className=" row-sm ">
                                    <Col lg={12} md={12}>
                                        <div className="custom-card main-content-body-profile">
                                            <Tab.Content>
                                                <Tab.Pane eventKey="Candidates">
                                                    <div
                                                        className="main-content-body tab-pane border-top-0  active"
                                                        id="candidates"
                                                    >
                                                        <Card>
                                                            <Card.Body className="card-body border pd-b-10">
                                                                <div className="p-4">
                                                                    <label className="main-content-label tx-13 mg-b-20">
                                                                        Statistics
                                                                    </label>
                                                                    <div className="profile-cover__info ms-4 ms-auto p-0">
                                                                        <Row className="nav p-0 border-bottom-0 mb-0">
                                                                            <Col sm={12} md={6} lg={6} xl={3}>
                                                                                <div className="border p-2 br-5 bg-light ht-70">
                                                                                    <span className="border-0 mb-0 pb-0">
                                                                                        {candidateData ? candidateData.length : 0}
                                                                                    </span>
                                                                                    Candidates
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={12} md={6} lg={6} xl={3}>
                                                                                <div className="border p-2 br-5 bg-light ht-70">
                                                                                    <span className="border-0 mb-0 pb-0">
                                                                                        {count.users ? count.users : 0}
                                                                                    </span>
                                                                                    Users
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={12} md={6} lg={6} xl={3}>
                                                                                <div className="border p-2 br-5 bg-light ht-70">
                                                                                    <span className="border-0 mb-0 pb-0">
                                                                                        {count.guarantees ? count.guarantees : 0}
                                                                                    </span>
                                                                                    Guarantees
                                                                                </div>
                                                                            </Col>
                                                                            <Col sm={12} md={6} lg={6} xl={3}>
                                                                                <div className="border p-2 br-5 bg-light ht-70">
                                                                                    <span className="border-0 mb-0 pb-0">
                                                                                        {count.others ? count.others : 0}
                                                                                    </span>
                                                                                    Others
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <label className="main-content-label tx-13 mg-b-20 mg-t-20">
                                                                        Candidate
                                                                    </label>
                                                                    <Row className=" row-sm">
                                                                        {
                                                                            candidateData && candidateData.map(element => {
                                                                                return (
                                                                                    <Col sm={12} md={6} lg={6} xl={3} key={element.id}>
                                                                                        <a href={`${process.env.PUBLIC_URL} /elections/` + id + `/` + element.id} className="pointer_action_button">
                                                                                            <CandidateCard name={element.fname + " " + element.lname} email={element.email} avatar={element.avatar} userid={element.id} eid={id} />
                                                                                        </a>
                                                                                    </Col>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Row>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Users">
                                                    <div
                                                        className="main-content-body tab-pane border-top-0"
                                                        id="edit"
                                                    >
                                                        <Card>
                                                            <Card.Body className=" border-0">
                                                                <div className="mb-4 main-content-label">
                                                                    Personal Information
                                                                </div>
                                                                <Form className="form-horizontal">
                                                                    <div className="mb-4 main-content-label">
                                                                        Name
                                                                    </div>
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    User Name
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="User Name"
                                                                                    defaultValue="Mack Adamia"
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    First Name
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="First Name"
                                                                                    defaultValue="Mack Adamia"
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    last Name
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Last Name"
                                                                                    defaultValue="Mack Adamia"
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Form>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Activities">
                                                    <div
                                                        className="main-content-body  tab-pane border-top-0"
                                                        id="activities"
                                                    >
                                                        <div className="border-0">
                                                            <div className="main-content-body main-content-body-profile">
                                                                <div className="main-profile-body p-0">
                                                                    <Row className=" row-sm">
                                                                        <div className="col-12">
                                                                            <Card className=" mg-b-20 border">
                                                                                <Card.Header className=" p-4">
                                                                                    <div className="media">
                                                                                        <div className="media-user me-2">
                                                                                            <div className="main-img-user avatar-md">
                                                                                                <img
                                                                                                    alt=""
                                                                                                    className="rounded-circle"
                                                                                                    src={require("../../../assets/img/faces/6.jpg")}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="media-body">
                                                                                            <h6 className="mb-0 ms-2 mg-t-3">
                                                                                                Mintrona Pechon Pechon
                                                                                            </h6>
                                                                                            <span className="text-muted ms-2">
                                                                                                Sep 26 2019, 10:14am
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="ms-auto">
                                                                                            <Dropdown className=" show main-contact-star">
                                                                                                <Dropdown.Toggle
                                                                                                    variant=""
                                                                                                    className="new option-dots2"
                                                                                                    data-bs-toggle="dropdown"

                                                                                                >
                                                                                                    <i className="fe fe-more-vertical  tx-18"></i>
                                                                                                </Dropdown.Toggle>
                                                                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                                                                    {" "}
                                                                                                    <Dropdown.Item
                                                                                                        className="dropdown-item"
                                                                                                        href="#"
                                                                                                    >
                                                                                                        Edit Post
                                                                                                    </Dropdown.Item>{" "}
                                                                                                    <Dropdown.Item
                                                                                                        className="dropdown-item"
                                                                                                        href="#"
                                                                                                    >
                                                                                                        Delete Post
                                                                                                    </Dropdown.Item>{" "}
                                                                                                    <Dropdown.Item
                                                                                                        className="dropdown-item"
                                                                                                        href="#"
                                                                                                    >
                                                                                                        Personal Settings
                                                                                                    </Dropdown.Item>{" "}
                                                                                                </Dropdown.Menu>
                                                                                            </Dropdown>
                                                                                        </div>
                                                                                    </div>
                                                                                </Card.Header>
                                                                                <Card.Body className=" h-100">
                                                                                    <p className="mg-t-0">
                                                                                        There are many variations of passages
                                                                                        of Lorem Ipsum available, but the
                                                                                        majority have suffered alteration in
                                                                                        some form, by injected humour, or
                                                                                        randomised words which don't look even
                                                                                        slightly believable.
                                                                                    </p>
                                                                                    <div className="media mg-t-15 profile-footer">
                                                                                        <div className="media-user me-2">
                                                                                            <div className="demo-avatar-group">
                                                                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                                                                    <div className="main-img-user online">
                                                                                                        <img
                                                                                                            alt=""
                                                                                                            className="rounded-circle"
                                                                                                            src={require("../../../assets/img/faces/12.jpg")}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="main-img-user">
                                                                                                        <img
                                                                                                            alt=""
                                                                                                            className="rounded-circle"
                                                                                                            src={require("../../../assets/img/faces/3.jpg")}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="main-img-user">
                                                                                                        <img
                                                                                                            alt=""
                                                                                                            className="rounded-circle"
                                                                                                            src={require("../../../assets/img/faces/4.jpg")}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="main-img-user online">
                                                                                                        <img
                                                                                                            alt=""
                                                                                                            className="rounded-circle"
                                                                                                            src={require("../../../assets/img/faces/10.jpg")}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="main-avatar">
                                                                                                        {" "}
                                                                                                        +23{" "}
                                                                                                    </div>
                                                                                                </div>
                                                                                                {/* <!-- demo-avatar-group --> */}
                                                                                            </div>
                                                                                            {/* <!-- demo-avatar-group --> */}
                                                                                        </div>
                                                                                        <div className="media-body">
                                                                                            <h6 className="mb-0 mg-t-10">
                                                                                                28 people like your photo
                                                                                            </h6>
                                                                                        </div>
                                                                                    </div>
                                                                                </Card.Body>
                                                                            </Card>
                                                                            <Card className=" border">
                                                                                <Card.Header className=" p-4">
                                                                                    <div className="media">
                                                                                        <div className="media-user me-2">
                                                                                            <div className="main-img-user avatar-md">
                                                                                                <img
                                                                                                    alt=""
                                                                                                    className="rounded-circle"
                                                                                                    src={require("../../../assets/img/faces/2.jpg")}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="media-body">
                                                                                            <h6 className="mb-0 ms-2 mg-t-3">
                                                                                                Mintrona Pechon Pechon
                                                                                            </h6>
                                                                                            <span className="text-muted ms-2">
                                                                                                Sep 26 2019, 10:14am
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="ms-auto">
                                                                                            <Dropdown className=" show main-contact-star">
                                                                                                <Dropdown.Toggle
                                                                                                    variant=""
                                                                                                    className="new option-dots2"
                                                                                                    data-bs-toggle="dropdown"

                                                                                                >
                                                                                                    <i className="fe fe-more-vertical  tx-18"></i>
                                                                                                </Dropdown.Toggle>
                                                                                                <Dropdown.Menu className="dropdown-menu shadow">
                                                                                                    {" "}
                                                                                                    <Dropdown.Item
                                                                                                        className="dropdown-item"
                                                                                                        href="#"
                                                                                                    >
                                                                                                        Edit Post
                                                                                                    </Dropdown.Item>{" "}
                                                                                                    <Dropdown.Item
                                                                                                        className="dropdown-item"
                                                                                                        href="#"
                                                                                                    >
                                                                                                        Delete Post
                                                                                                    </Dropdown.Item>{" "}
                                                                                                    <Dropdown.Item
                                                                                                        className="dropdown-item"
                                                                                                        href="#"
                                                                                                    >
                                                                                                        Personal Settings
                                                                                                    </Dropdown.Item>{" "}
                                                                                                </Dropdown.Menu>
                                                                                            </Dropdown>
                                                                                        </div>
                                                                                    </div>
                                                                                </Card.Header>
                                                                                <Card.Body className=" h-100">
                                                                                    <p className="mg-t-0">
                                                                                        There are many variations of passages
                                                                                        of Lorem Ipsum available, but the
                                                                                        majority have suffered alteration in
                                                                                        some form, by injected humour, or
                                                                                        randomised words which don't look even
                                                                                        slightly believable.
                                                                                    </p>
                                                                                    <Row className=" row-sm">
                                                                                        <div className="col">
                                                                                            <Link to={`${process.env.PUBLIC_URL}/pages/gallery`}>
                                                                                                <img
                                                                                                    alt="img"
                                                                                                    className="wd-200 br-5 mb-2 mt-2 me-3"
                                                                                                    src={require("../../../assets/img/media/4.jpg")}
                                                                                                />
                                                                                            </Link>
                                                                                            <Link to={`${process.env.PUBLIC_URL}/pages/gallery`}>
                                                                                                <img
                                                                                                    alt="img"
                                                                                                    className="wd-200 br-5 mb-2 mt-2"
                                                                                                    src={require("../../../assets/img/media/3.jpg")}
                                                                                                />
                                                                                            </Link>
                                                                                        </div>
                                                                                    </Row>
                                                                                    <div className="media mg-t-15 profile-footer">
                                                                                        <div className="media-user me-2">
                                                                                            <div className="demo-avatar-group">
                                                                                                <div className="demo-avatar-group main-avatar-list-stacked">
                                                                                                    <div className="main-img-user online">
                                                                                                        <img
                                                                                                            alt=""
                                                                                                            className="rounded-circle"
                                                                                                            src={require("../../../assets/img/faces/11.jpg")}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="main-img-user">
                                                                                                        <img
                                                                                                            alt=""
                                                                                                            className="rounded-circle"
                                                                                                            src={require("../../../assets/img/faces/12.jpg")}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="main-img-user">
                                                                                                        <img
                                                                                                            alt=""
                                                                                                            className="rounded-circle"
                                                                                                            src={require("../../../assets/img/faces/3.jpg")}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="main-img-user online">
                                                                                                        <img
                                                                                                            alt=""
                                                                                                            className="rounded-circle"
                                                                                                            src={require("../../../assets/img/faces/5.jpg")}
                                                                                                        />
                                                                                                    </div>
                                                                                                    <div className="main-avatar">
                                                                                                        {" "}
                                                                                                        +23{" "}
                                                                                                    </div>
                                                                                                </div>
                                                                                                {/* <!-- demo-avatar-group --> */}
                                                                                            </div>
                                                                                            {/* <!-- demo-avatar-group --> */}
                                                                                        </div>
                                                                                        <div className="media-body">
                                                                                            <h6 className="mb-0 mg-t-10">
                                                                                                28 people like your photo
                                                                                            </h6>
                                                                                        </div>
                                                                                    </div>
                                                                                </Card.Body>
                                                                            </Card>
                                                                        </div>
                                                                    </Row>
                                                                </div>
                                                                {/* <!-- main-profile-body --> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Settings">
                                                    <div
                                                        className="main-content-body tab-pane  border-0"
                                                        id="settings"
                                                    >
                                                        <Card>
                                                            <Card.Body
                                                                className=" border-0"
                                                                data-select2-id="12"
                                                            >
                                                                <Form
                                                                    className="form-horizontal"
                                                                    data-select2-id="11"
                                                                >
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    Title
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Election Title"
                                                                                    id="title"
                                                                                    name="title"
                                                                                    value={electionUpData.title}
                                                                                    onChange={(event) => setElectionValue(event)}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    Content
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <textarea
                                                                                    className="form-control"
                                                                                    placeholder="Textarea"
                                                                                    rows="3"
                                                                                    id="description"
                                                                                    name="description"
                                                                                    value={electionUpData.description}
                                                                                    onChange={(event) => setElectionValue(event)}
                                                                                ></textarea>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    Election Date
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <Form.Control
                                                                                    type="date"
                                                                                    className="form-control"
                                                                                    placeholder="Election Date"
                                                                                    value={moment(electionUpData.date).format("YYYY-MM-DD")}
                                                                                    id="date"
                                                                                    name="date"
                                                                                    onChange={(event) => setElectionValue(event)}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    Election Location
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    className="form-control"
                                                                                    placeholder="Election Location"
                                                                                    id="location"
                                                                                    name="location"
                                                                                    value={electionUpData.location}
                                                                                    onChange={(event) => setElectionValue(event)}
                                                                                />
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    Election Type
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <select
                                                                                    className="form-control"
                                                                                    placeholder="Election Location"
                                                                                    id="type"
                                                                                    name="type"
                                                                                    value={electionUpData.type}
                                                                                    onChange={(event) => setElectionValue(event)}
                                                                                >
                                                                                    <option value="">-- Select an option --</option>
                                                                                    <option value="parties">Party Only</option>
                                                                                    <option value="candidates">Candidate Only</option>
                                                                                    <option value="both">Both Parties and Candidates</option>
                                                                                </select>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                    <FormGroup className="form-group ">
                                                                        <Row className=" row-sm">
                                                                            <Col md={3}>
                                                                                <Form.Label className="form-label">
                                                                                    Featured Image
                                                                                </Form.Label>
                                                                            </Col>
                                                                            <Col md={9}>
                                                                                <Col md={5}>
                                                                                    <Dropzone
                                                                                        onDrop={(event) => {
                                                                                            handleImageChange(event);
                                                                                        }}
                                                                                    >
                                                                                        {({ getRootProps, getInputProps }) => (
                                                                                            <div className="dropzone dz-clickable">
                                                                                                <div className="dz-message needsclick" {...getRootProps()}>
                                                                                                    <ImageDashComponent imagePath={electionUpData.image} />
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </Dropzone>
                                                                                </Col>
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                    <FormGroup className="form-group">
                                                                        <Row className=" row-sm">
                                                                            <Col md={12}>
                                                                                {" "}
                                                                                <span
                                                                                    className="btn btn-primary mb-1 float-end"
                                                                                    to="#"
                                                                                    onClick={updatePost}
                                                                                >
                                                                                    Update Post
                                                                                </span>{" "}
                                                                            </Col>
                                                                        </Row>
                                                                    </FormGroup>
                                                                </Form>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>
                    </span>
                </Col>
                <Col xl={3} lg={12} md={12} sm={12}>
                    <Col xl={12} lg={12}>
                        <Card className=" user-wideget user-wideget-widget widget-user">
                            <div className="widget-user-header br-te-5  br-ts-5  bg-primary">
                            </div>
                            <div className="widget-user-image">
                                <img alt="avatar" className="rounded-circle" src={require("../../../assets/img/user.png")} />
                            </div>
                            <div className="user-wideget-footer text-center">
                                <h4 className="fs-16 mb-0 mt-3 text-dark fw-semibold">
                                    {" "}
                                </h4>
                            </div>
                            <div className="user-wideget-footer">
                                <h3 className="card-title mb-2">Election Title: <span>{electionData.title}</span></h3>
                                <h3 className="card-title mb-2">Election Date: <span>{electionData.date}</span></h3>
                                <p><strong>Team:</strong></p>
                                <ul>
                                    <li><strong>Supervisors:</strong> () </li>
                                    <li><strong>Guarantors:</strong> () </li>
                                    <li><strong>Checkers:</strong> () </li>
                                    <li><strong>Sorters:</strong> () </li>
                                </ul>
                                <p><strong>User Infomation:</strong></p>
                                <ul>
                                    <li><strong>Name:</strong> {" "} </li>
                                    <li><strong>Role:</strong> {" "} </li>
                                    <li><strong>Rank:</strong> {" "} </li>
                                    <li><strong>Mobile:</strong> {" "} </li>
                                    <li><strong>Em@il:</strong> {" "} </li></ul>
                            </div>
                            <a href="https://thevirtualrealitytrip.com/wp-login.php?action=logout&amp;_wpnonce=95af37bd92" className="btn btn-danger  btn-rounded">Logout</a>
                        </Card>
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
        </div>
    );
}

ElectionsDetail.propTypes = {};

ElectionsDetail.defaultProps = {};

export default ElectionsDetail;
