import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./App.css";

import { FormPage } from "./pages";

export const history = createBrowserHistory();

export class App extends React.Component {
  public render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container">
            <ul className="nav navbar-nav">
              <li><a href="#">Link</a></li>
            </ul>
          </div>
        </nav>
        <Router history={history}>
          <div className="col-sm-8 col-sm-offset-2">
            <Switch>
              <Route exact path="/" component={FormPage} />
              <Route exact path="/create" component={FormPage} />
              <Route exact path="/edit/:id" component={FormPage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

// export const App: React.FunctionComponent = () => {
//   const [value, setValue] = React.useState("");
//   const onInput = React.useCallback((e) => setValue(e.target.value), [setValue]);
//   const alert = React.useRef<HTMLElement | null>(null);

//   React.useEffect(() => {
//     const { current } = alert;
//     const listener = (e: any) => console.log(e);
//     current!.addEventListener("dismiss", listener);
//     ReactDOM.render(<p>children</p>, current!.querySelector("slot"));

//     return () => current!.removeEventListener("dismiss", listener);
//   }, [alert]);

//   return <vm-alert ref={alert} message="123" type="alert-success" />;
// };
