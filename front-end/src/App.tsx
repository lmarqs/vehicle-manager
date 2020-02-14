import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import { FormPage, ListPage } from "./pages";

export const history = createBrowserHistory();

export class App extends React.Component {
  public render() {
    const search = new URLSearchParams(location.search);
    const q = search.get("q");

    return (
      <Router history={history}>
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="container">
              <ul className="nav navbar-nav">
                <li><a href="/">All Vehicles</a></li>
                <li><a href="/create">Create a Vehicle</a></li>
              </ul>
              <form action="/" method="get" className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input className="form-control" name="q" defaultValue={q ?? ""} placeholder="Search" autoComplete="off" />
                </div>
                <button type="submit" className="btn btn-default">Search</button>
              </form>
            </div>
          </nav>

          <div className="col-sm-8 col-sm-offset-2">
            <Switch>
              <Route exact path="/" component={ListPage} />
              <Route exact path="/create" component={FormPage} />
              <Route exact path="/edit/:id" component={FormPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
