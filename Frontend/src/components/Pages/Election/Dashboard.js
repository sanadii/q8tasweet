/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Breadcrumb, Card, Col, Row } from "react-bootstrap";
import { backend_url } from "../../Constant/Config";
import ElectionCard from "../../Cards/ElectionCard";
import ElectionList from "../../Lists/ElectionList";
const ElectionsDash = () => {
    const [allData, setAllData] = React.useState(null);
    const [prev5Data, setPrev5Data] = React.useState(null);
    React.useEffect(() => {
        fetch(backend_url + 'getUpElection', { method: 'GET' })
            .then(response => response.json())
            .then(data => setAllData(data.data));
        fetch(backend_url + 'getPrev5Election', { method: 'GET' })
            .then(response => response.json())
            .then(data => setPrev5Data(data.data));
    }, [])
    return (
        <div>
            {/* <!-- breadcrumb --> */}
            <div className="breadcrumb-header justify-content-between">
                <div className="left-content">
                    <span className="main-content-title mg-b-0 mg-b-lg-1">ELECTION DASHBOARD</span>
                </div>
                <div className="justify-content-center mt-2">
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-item tx-15" to="#">
                            Election Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            className="breadcrumb-item "
                            active
                            aria-current="page"
                        >
                            Sales
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            {/* <!-- /breadcrumb --> */}

            {/* <!-- row --> */}
            <Row>
                <Col md={12} lg={9} xl={9}>
                    <Row>
                        {
                            allData && allData.map(element => {
                                return (
                                    <Col lg={6} xl={3} sm={6} key={element.id}>
                                        <ElectionCard id={element.id} title={element.title} image={element.image} date={element.date}></ElectionCard>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
                <Col sm={6} lg={6} xl={3}>
                    <Card className="overflow-hidden">
                        <Card.Header className=" pb-0">
                            <h3 className="card-title mb-2">PREVIOUS 5 ELECTIONS</h3>
                        </Card.Header>
                        <Card.Body className=" pt-1">
                            <div className="list-catergory1">
                                <div className="item-list">
                                    <ul className="list-group mb-0">
                                        {
                                            prev5Data && prev5Data.map(element => {
                                                return (
                                                    <li className="list-group-item d-flex border-bottom-0 pt-4" key={element
                                                        .id}>
                                                        <ElectionList id={element.id} title={element.title} date={element.date} image={element.image} status="old" />
                                                    </li>
                                                )
                                            })
                                        }
                                        <li className="list-group-item d-flex border-bottom pt-4">
                                            {
                                                prev5Data && prev5Data.length - 5 === 0 ? <></> :
                                                    <p>View All Previous Elections.</p>
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        </div >
    )
};

ElectionsDash.propTypes = {};

ElectionsDash.defaultProps = {};

export default ElectionsDash;
