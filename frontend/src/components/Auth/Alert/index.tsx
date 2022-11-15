import React, { FC, useState } from "react";
import Alert from "react-bootstrap/Alert";
import s from "./Alert.module.scss";

const AlertMsg: FC<{ msg: string }> = ({ msg }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert className={s.alert} variant="warning" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{msg}</Alert.Heading>
      </Alert>
    );
  }
  return <></>;
};

export default AlertMsg;
