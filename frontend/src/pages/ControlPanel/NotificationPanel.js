import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from 'Selectors';
import { Card, CardHeader, CardBody, Button, Col, Row } from 'reactstrap';

// Form Field validation & Fields
import { FormFields } from "components"
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form } from "reactstrap";
// import { fields } from "./WebSocketFields";

import { UncontrolledAlert } from 'reactstrap';
import { notificationGroup, messageTypes, dataTypes, userGroups } from "constants";
import { useWebSocketContext } from 'utils/WebSocketContext';


const READY_STATE_OPEN = 1;

export const NotificationPanel = () => {

    // State Management
    const { userCampaigns } = useSelector(userSelector);

    // Use global WebSocket context
    const { sendMessage, readyState, messageHistory } = useWebSocketContext();

    // Form validation
    const validation = useFormik({
        initialValues: {
            dataType: 'notification',
            notificationGroup: 'users',
            userGroup: 'allUsers',
            campaign: 'primary',
            election: '',
            messageType: 'info',
            message: '',
        },

        validationSchema: Yup.object({
            dataType: Yup.string().required("Data type is required"),
            userGroup: Yup.string().required("Group type is required"),
            messageType: Yup.string().required("Notification type is required"),
            message: Yup.string().required("Message is required"),
        }),
        onSubmit: (values) => {
            if (readyState === READY_STATE_OPEN) {
                const messageData = {
                    dataType: values.dataType,
                    messageType: values.messageType,
                    message: values.message,
                    notificationGroup: values.notificationGroup,
                };

                // Conditionally add fields based on notificationGroup
                switch (values.notificationGroup) {
                    case 'users':
                        messageData.userGroup = values.userGroup;
                        break;
                    case 'campaigns':
                        messageData.campaign = values.campaign;
                        break;
                    case 'elections':
                        messageData.election = values.election;
                        break;
                    default:
                        // Handle default case if needed
                        break;
                }

                sendMessage(JSON.stringify(messageData));
            } else {
                console.error('WebSocket connection is not open.');
            }
            // validation.resetForm();
        },
    });



    const fields = [
        {
            id: "data-type",
            name: "dataType",
            label: "Data Type",
            type: "select",
            options: dataTypes.map(dataType => ({
                id: dataType,
                label: dataType,
                value: dataType,
            })),
            colSize: 4,

        },
        {
            id: "Notification-group",
            name: "notificationGroup",
            label: "Notification Group",
            type: "select",
            options: [
                ...notificationGroup.map(item => ({
                    id: item.id,
                    label: item.label,
                    value: item.value,
                }))
            ],
            condition: validation.values.dataType === "notification",
            colSize: 4,

        },
        {
            id: "socket-groups",
            name: "userGroup",
            label: "User Groups",
            type: "select",
            options: [
                ...userGroups.map(userGroup => ({
                    id: userGroup.id,
                    label: userGroup.label,
                    value: userGroup.value,
                }))
            ],
            condition: validation.values.notificationGroup === "users",
            colSize: 4,

        },
        {
            id: "campaign-groups",
            name: "campaign",
            label: "Campaigns",
            type: "select",
            options: [
                { id: '', label: '- Choose Campaign - ', value: '' },
                ...userCampaigns.map(campaign => ({
                    id: campaign.id,
                    label: campaign.candidate.name,
                    value: campaign.slug,
                }))
            ],
            condition: validation.values.notificationGroup === "campaigns",
            colSize: 4,

        },
        {
            id: "notification-type",
            name: "messageType",
            label: "Notification Type",
            type: "select",
            options: [
                ...messageTypes.map(messageType => ({
                    id: messageType.id,
                    label: messageType.label,
                    value: messageType.value,
                }))
            ],
            condition: validation.values.dataType === "notification",
            colSize: 6,

        },
        {
            id: "message",
            name: "message",
            label: "Message",
            type: "text",
            colSize: 12,

        },
    ].filter(Boolean);


    const getNotificationDetails = (type) => {
        const details = messageTypes.find(nt => nt.value === type);

        return details;
    };

    const renderNotificationMessages = (item) => {
        const notificationHistory = messageHistory.notification || [];
        const messages = notificationHistory.filter(msg => msg.notificationGroup === item.value);

        return (
            <Col md={4} key={item.label}>
                <Card>
                    <CardHeader>
                        <h4>{`${item.label.charAt(0).toUpperCase() + item.label.slice(1)}`}</h4>
                    </CardHeader>
                    <CardBody>
                        {
                            messages.map((msg, idx) => {
                                const notificationDetails = getNotificationDetails(msg.messageType);

                                return (
                                    <UncontrolledAlert
                                        key={idx}
                                        color={notificationDetails.color}
                                        className={`${notificationDetails.className} fade show`}>
                                        <i className={`${notificationDetails.iconClass} label-icon`}></i>
                                        <strong>{notificationDetails.label}</strong> - {msg.message}
                                    </UncontrolledAlert>
                                );
                            })
                        }
                    </CardBody>
                </Card>
            </Col>
        );
    };



    const renderDataTypeMessages = (dataTypeName) => {
        const messages = messageHistory[dataTypeName] || [];

        return (
            <Col md={3} key={dataTypeName}>
                <Card>
                    <CardHeader>
                        <h4>{`${dataTypeName.charAt(0).toUpperCase() + dataTypeName.slice(1)}`}</h4>
                    </CardHeader>
                    <CardBody>
                        {
                            messages.map((msg, idx) => {
                                const notificationDetails = getNotificationDetails(msg.messageType);

                                return (
                                    <UncontrolledAlert
                                        key={idx}
                                        color={notificationDetails.color}
                                        className={`${notificationDetails.className} fade show`}>
                                        <i className={`${notificationDetails.iconClass} label-icon`}></i>
                                        <strong>{notificationDetails.label}</strong> - {msg.message}
                                    </UncontrolledAlert>
                                );
                            })
                        }
                    </CardBody>
                </Card>
            </Col>
        );
    };


    return (
        <React.Fragment>
            <Card>
                <CardHeader><h5>اشعارات</h5></CardHeader>
                <CardBody>
                    <Form onSubmit={validation.handleSubmit}>
                        <Row className="g-3">
                            {
                                fields.map(field => {
                                    return (field.condition === undefined || field.condition) && (
                                        <FormFields
                                            key={field.id}
                                            field={field}
                                            validation={validation}
                                        />
                                    );
                                })
                            }
                        </Row>

                        <Row className="mt-2">
                            <Col>
                                <Button color="primary" type="submit">
                                    Send Message
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
            <Row>
                {notificationGroup.map((item) => renderNotificationMessages(item))}
            </Row>
            <Row>
                {dataTypes.map((dataTypeName) => renderDataTypeMessages(dataTypeName))}
            </Row>
        </React.Fragment >
    );
};

export default NotificationPanel;