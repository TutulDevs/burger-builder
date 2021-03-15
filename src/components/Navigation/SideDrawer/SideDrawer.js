import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = (props) => {
  // to show drawer
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />

      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavItems 
            isAuthenticated={props.isAuth}
          />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
