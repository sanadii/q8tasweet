import React from "react";
import { Breadcrumb, Button, Card, Row, Col, Form, Toast } from "react-bootstrap";

import { toast, Slide, Flip } from "react-toastify";
import { ToastContainer } from "react-toastify";
export const Default = (props) =>
  toast.success(
    <p className="text-white tx-16 mb-0">
      {props.text}
    </p>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      autoClose: 5000,
      theme: "colored",
    }
  );
export const Center = () =>
  toast.error(
    <p className="text-white tx-16 mb-0">Default Center Notification</p>,
    {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose: 5000,
      theme: "colored",
    }
  );
export const Left = () =>
  toast.warn(
    <p className="text-white tx-16 mb-0">Default Left Notification</p>,
    {
      position: toast.POSITION.TOP_LEFT,
      hideProgressBar: true,
      autoClose: 5000,
      theme: "colored",
    }
  );
export const Toastslidesucc = () =>
  toast.success(
    <p className="text-white tx-16 mb-0 ">Slide Notification</p>,

    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      transition: Slide,
      autoClose: 1000,
      theme: "colored",
    }
  );
export const Toastslidewarn = () =>
  toast.warn(<p className="text-white tx-16 mb-0">Slide Notification</p>, {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    transition: Slide,
    autoClose: 1000,
    theme: "colored",
  });
export const Toastslideerror = () =>
  toast.error(
    <p className="text-white tx-16 mb-0 ">Slide Notification</p>,

    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      transition: Slide,
      autoClose: 1000,
      theme: "colored",
    }
  );

export const Danger1 = () =>
  toast.error(
    <p className="text-white tx-16 mb-0 ">Oops! An Error Occurred</p>,
    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      transition: Flip,
      theme: "colored",
    }
  );
export const InfoTimeNotification = (text = "info", time = 5) => {
  console.log("fsdfsdf");
  toast.info(<p className="text-white tx-16 mb-0 ">{text}</p>, {
    autoClose: time,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: false,
    transition: Flip,
    theme: "colored",
  });
}
export const Danger3 = () =>
  toast.warn(
    <p className="text-white tx-16 mb-0">Warning : Something Went Wrong</p>,
    {
      autoClose: false,
      position: toast.POSITION.TOP_LEFT,
      hideProgressBar: false,
      transition: Flip,
      theme: "colored",
    }
  );
export const Danger4 = () =>
  toast.success(
    <p className="text-white tx-16 mb-0 ">Slide Notification</p>,

    {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      transition: Slide,
      autoClose: 1000,
      theme: "colored",
    }
  );
