import React from "react";
import classes from "./Backdrop.css";

// if show is active, make it visible
const backdrop = (props) =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null;

export default backdrop;
