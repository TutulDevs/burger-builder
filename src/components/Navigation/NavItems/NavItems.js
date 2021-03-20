import React from "react";
import NavItem from "./NavItem/NavItem";
import classes from "./NavItems.css";

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem exact link='/'>Burger Builder</NavItem>

    {props.isAuthenticated 
      ? <NavItem link='/orders'>Orders</NavItem> 
      : null }

    {props.isAuthenticated 
      ? <NavItem link='/logout'>LogOut</NavItem> 
      : <NavItem link='/auth'>Auth</NavItem> }
  </ul>
);

export default navItems;
