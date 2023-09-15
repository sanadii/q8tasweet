import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Don't forget to import useSelector

import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();

  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // Apps
  const [isElections, setIsElections] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    // ------------------ DASHBOARD -----------------------
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }

    // ---------------- AUTHENTICATION ---------------------

    if (iscurrentState !== "Admin") {
      setIsAdmin(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }

    // ---------------- SUBSCRIBER PAGES --------------------
    if (iscurrentState === "elections") {
      history("/elections");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "candidates") {
      history("/candidates");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "campaigns") {
      history("/campaigns");
      document.body.classList.add("twocolumn-panel");
    }

    // ------------------ ADMIN PAGES -------------------------
    if (iscurrentState === "elections") {
      history("/admin/elections");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "candidates") {
      history("/admin/candidates");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "campaigns") {
      history("/admin/campaigns");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "users") {
      history("/admin/users");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, iscurrentState, isDashboard, isApps, isAdmin, isAuth]);

  const currentUser = useSelector(state => state.Users.currentUser);
  const isStaff = currentUser?.is_staff;

  const adminItems = [

    {
      label: "Admin",
      isHeader: true,
    },
    {
      id: "elections",
      label: "Election List",
      icon: "ri-dashboard-line",
      link: "/admin/elections",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("adminElections");
      },
    },
    {
      id: "candidates",
      label: "Candidate List",
      icon: "ri-account-pin-box-line",
      link: "/admin/candidates",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("adminCandidates");
      },
    },
    {
      id: "campaigns",
      label: "Campaign List",
      icon: "ri-honour-line",
      link: "/admin/campaigns",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("adminCampaigns");
      },
    },
    {
      id: "users",
      label: "User List",
      icon: "ri-honour-line",
      link: "/admin/users",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("adminUsers");
      },
    },
    // {
    //   label: "Menu",
    //   isHeader: true,
    // },
    // {
    //   id: "dashboard",
    //   label: "Dashboards",
    //   icon: "ri-dashboard-2-line",
    //   link: "/#",
    //   stateVariables: isDashboard,
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsDashboard(!isDashboard);
    //     setIscurrentState("Dashboard");
    //     updateIconSidebar(e);
    //   },
    //   subItems: [
    //     // {
    //     //   id: "elections",
    //     //   label: "Elections List",
    //     //   link: "/elections-list",
    //     //   parentId: "dashboard",
    //     // },
    //     // {
    //     //   id: "candidates",
    //     //   label: "Candidates List",
    //     //   link: "/#",
    //     //   parentId: "dashboard",
    //     // },
    //     // {
    //     //   id: "electionCandidate",
    //     //   label: "Election Candidate",
    //     //   link: "/election-candidates",
    //     //   parentId: "dashboard",
    //     // },
    //     // {
    //     //   id: "campaigns",
    //     //   label: "Campaigns",
    //     //   link: "/campaigns",
    //     //   parentId: "dashboard",
    //     // },
    //     {
    //       id: "One More",
    //       label: "One More",
    //       link: "/#",
    //       parentId: "dashboard",
    //     },
    //     // {
    //     //   id: "alphabet",
    //     //   label: "Alphabet",
    //     //   link: "/alphabet",
    //     //   parentId: "dashboard",
    //     // },
    //   ],
    // },
    // {
    //   id: "apps",
    //   label: "Apps",
    //   icon: "ri-apps-2-line",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsApps(!isApps);
    //     setIscurrentState("Apps");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isApps,
    //   subItems: [
    //     {
    //       id: "elections",
    //       label: "Elections",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsElections(!isElections);
    //       },
    //       parentId: "apps",
    //       stateVariables: isElections,
    //       childItems: [
    //         {
    //           id: 1,
    //           label: "List View",
    //           link: "/apps-elections-list-view",
    //           parentId: "apps",
    //         },
    //         // {
    //         //   id: 2,
    //         //   label: "Election Details",
    //         //   link: "/apps-elections-details",
    //         //   parentId: "apps",
    //         // },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   label: "Admin",
    //   isHeader: true,
    // },
    // {
    //   id: "admin",
    //   label: "Admin",
    //   icon: "ri-apps-2-line",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsAdmin(!isAdmin);
    //     setIscurrentState("Admin");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isAdmin,
    //   subItems: [
    //     {
    //       id: "elections",
    //       label: "Elections",
    //       link: "/#",
    //       parentId: "Admin",
    //     },
    //     {
    //       id: "candidates",
    //       label: "Candidates",
    //       link: "/#",
    //       parentId: "Admin",
    //     },
    //     // {
    //     //   id: "users",
    //     //   label: "Users",
    //     //   link: "/#",
    //     //   parentId: "Admin",
    //     //   badgeColor: "success",
    //     //   badgeName: "New",
    //     // },
    //     {
    //       id: "subscription",
    //       label: "Subscription",
    //       link: "/#",
    //       parentId: "Admin",
    //       badgeColor: "success",
    //       badgeName: "New",
    //     },
    //   ],
    // },
    // {
    //   id: "settings",
    //   label: "Setting",
    //   icon: "ri-apps-2-line",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsSetting(!isSetting);
    //     setIscurrentState("Setting");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isSetting,
    //   subItems: [
    //     {
    //       id: "settings",
    //       label: "Setting",
    //       link: "/settings",
    //       parentId: "Setting",
    //     },
    //     {
    //       id: "categories",
    //       label: "Categories",
    //       link: "/settings/categories",
    //       parentId: "Setting",
    //     },
    //     // {
    //     //   id: "PrivecyPolicy",
    //     //   label: "Ecommerce",
    //     //   link: "/ecommerce",
    //     //   parentId: "Setting",
    //     //   badgeColor: "success",
    //     //   badgeName: "New",
    //     // },
    //     {
    //       id: "terms-conditions",
    //       label: "Terms & Condition",
    //       link: "/#",
    //       parentId: "Setting",
    //       badgeColor: "success",
    //       badgeName: "New",
    //     },
    //   ],
    // },
    // {
    //   label: "pages",
    //   isHeader: true,
    // },
    // {
    //   id: "authentication",
    //   label: "Authentication",
    //   icon: "ri-account-circle-line",
    //   link: "/#",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIsAuth(!isAuth);
    //     setIscurrentState("Auth");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isAuth,
    //   subItems: [
    //     {
    //       id: "signIn",
    //       label: "Sign In",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsSignIn(!isSignIn);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isSignIn,
    //       childItems: [
    //         { id: 1, label: "Basic", link: "/auth-signin-basic" },
    //         { id: 2, label: "Cover", link: "/auth-signin-cover" },
    //       ],
    //     },
    //     {
    //       id: "signUp",
    //       label: "Sign Up",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsSignUp(!isSignUp);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isSignUp,
    //       childItems: [
    //         { id: 1, label: "Basic", link: "/auth-signup-basic" },
    //         { id: 2, label: "Cover", link: "/auth-signup-cover" },
    //       ],
    //     },
    //     {
    //       id: "passwordReset",
    //       label: "Password Reset",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsPasswordReset(!isPasswordReset);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isPasswordReset,
    //       childItems: [
    //         { id: 1, label: "Basic", link: "/auth-pass-reset-basic" },
    //         { id: 2, label: "Cover", link: "/auth-pass-reset-cover" },
    //       ],
    //     },
    //     {
    //       id: "passwordCreate",
    //       label: "Password Create",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsPasswordCreate(!isPasswordCreate);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isPasswordCreate,
    //       childItems: [
    //         { id: 1, label: "Basic", link: "/auth-pass-change-basic" },
    //         { id: 2, label: "Cover", link: "/auth-pass-change-cover" },
    //       ],
    //     },
    //     {
    //       id: "lockScreen",
    //       label: "Lock Screen",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsLockScreen(!isLockScreen);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isLockScreen,
    //       childItems: [
    //         { id: 1, label: "Basic", link: "/auth-lockscreen-basic" },
    //         { id: 2, label: "Cover", link: "/auth-lockscreen-cover" },
    //       ],
    //     },
    //     {
    //       id: "logout",
    //       label: "Logout",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsLogout(!isLogout);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isLogout,
    //       childItems: [
    //         { id: 1, label: "Basic", link: "/auth-logout-basic" },
    //         { id: 2, label: "Cover", link: "/auth-logout-cover" },
    //       ],
    //     },
    //     {
    //       id: "successMessage",
    //       label: "Success Message",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsSuccessMessage(!isSuccessMessage);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isSuccessMessage,
    //       childItems: [
    //         { id: 1, label: "Basic", link: "/auth-success-msg-basic" },
    //         { id: 2, label: "Cover", link: "/auth-success-msg-cover" },
    //       ],
    //     },
    //     {
    //       id: "twoStepVerification",
    //       label: "Two Step Verification",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsVerification(!isVerification);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isVerification,
    //       childItems: [
    //         { id: 1, label: "Basic", link: "/auth-twostep-basic" },
    //         { id: 2, label: "Cover", link: "/auth-twostep-cover" },
    //       ],
    //     },
    //     {
    //       id: "errors",
    //       label: "Errors",
    //       link: "/#",
    //       isChildItem: true,
    //       click: function (e) {
    //         e.preventDefault();
    //         setIsError(!isError);
    //       },
    //       parentId: "authentication",
    //       stateVariables: isError,
    //       childItems: [
    //         { id: 1, label: "404 Basic", link: "/auth-404-basic" },
    //         { id: 2, label: "404 Cover", link: "/auth-404-cover" },
    //         { id: 3, label: "404 Alt", link: "/auth-404-alt" },
    //         { id: 4, label: "500", link: "/auth-500" },
    //         { id: 5, label: "Offline Page", link: "/auth-offline" },
    //       ],
    //     },
    //   ],
    // },
  ]

  const menuItems = [
    {
      label: "Subscriber",
      isHeader: true,
    },
    {
      id: "campaigns",
      label: "Campaign List",
      icon: "ri-honour-line",
      link: "/campaigns",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("campaigns");
      },
    },
    ...(isStaff ? adminItems : []),
  ];


  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
