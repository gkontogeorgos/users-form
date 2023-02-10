import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import loading from "common/assets/images/loading.gif";
import "styles.scss";

const UsersPanel = lazy(() => import("../components/UsersPanel/UsersPanel"));

const renderLoader = () => (
  <div className="loadingIcon">
    <img src={loading} alt=""></img>
  </div>
);

const UsersPanelComponent = () => (
  <Suspense fallback={renderLoader()}>
    <UsersPanel />
  </Suspense>
);

const Router = () => {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Switch>
          <Redirect from="/" exact to="/home" />
          <Route exact path="/home" component={UsersPanelComponent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
