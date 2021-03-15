import React from "react";
import NavItem from "./NavItem/NavItem";
import classes from "./NavItems.css";

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem exact link='/'>Burger Builder</NavItem>
    <NavItem link='/orders'>Orders</NavItem>
    {props.isAuthenticated 
      ? <NavItem link='/logout'>LogOut</NavItem> 
      : <NavItem link='/auth'>Auth</NavItem> }
  </ul>
);

export default navItems;
