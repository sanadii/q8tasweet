
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import Loader from "./shade/Loaders/Loaders"
const App = React.lazy(() => import("../src/shade/layouts/App"));
const Switcherapp = React.lazy(() => import("../src/shade/layouts/Switcherapp"));
const Custompages = React.lazy(() => import("../src/shade/layouts/custompages"));
const Dashboard = React.lazy(() =>
  import("./components/Dashboard/Dashboard-1/Dashboard")
);
//App
const ElectionsDash = React.lazy(() => import("./components/Pages/Election/Dashboard"));
const ElectionsDetail = React.lazy(() => import("./components/Pages/Election/Detail"));
const UserDetailIndex = React.lazy(() => import("./components/Pages/User/Detail/index"));
const MenuLists = React.lazy(() => import("./components/Pages/System/Menu"));
const PermissionList = React.lazy(() => import("./components/Pages/System/Permission"));
const RoleList = React.lazy(() => import("./components/Pages/Authority/Role"));
const RankList = React.lazy(() => import("./components/Pages/Authority/Rank"));
const UserList = React.lazy(() => import("./components/Pages/User/List"));
const ElectionLists = React.lazy(() => import("./components/Pages/Election/Lists"));
const Error404 = React.lazy(() => import("./components/Pages/Authentication/404Error/404Error"));
//Form
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path={`${process.env.PUBLIC_URL}/`} element={<App />}>
            <Route
              path={`${process.env.PUBLIC_URL}/elections`}
              element={<ElectionsDash />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/elections/:id`}
              element={<ElectionsDetail />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/elections/:id/:userid`}
              element={<UserDetailIndex />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/dashboard`}
              element={<Dashboard />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/system/menu`}
              element={<MenuLists />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/system/permission`}
              element={<PermissionList />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/authority/rank`}
              element={<RankList />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/authority/role`}
              element={<RoleList />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/user/list`}
              element={<UserList />}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/election/list`}
              element={<ElectionLists />}
            />
          </Route>

          <Route path={`${process.env.PUBLIC_URL}/`} element={<Custompages />}>
            <Route path="*" element={<Error404 />} />
          </Route>
          <Route>
            <Route
              path={`${process.env.PUBLIC_URL}/pages/switcher/switcher-1`}
              element={<Switcherapp />}
            />
          </Route>
          <Route></Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
