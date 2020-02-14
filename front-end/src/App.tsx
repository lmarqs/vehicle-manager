import React from "react";

import "./web-components";

import "./App.css";

export const App: React.FunctionComponent = () => {
  const [value, setValue] = React.useState("");
  const onInput = React.useCallback(e => setValue(e.target.value), [setValue]);
  const alert = React.useRef();

  React.useEffect(() => {
    const { current } = alert;
    const listener = (e) => console.log(e);
    current!.addEventListener('dismiss', listener);
    return () => current!.removeEventListener('dismiss')
  }, [alert]);


  return <vm-alert ref={alert} message="123" type="alert-success" />;
};
