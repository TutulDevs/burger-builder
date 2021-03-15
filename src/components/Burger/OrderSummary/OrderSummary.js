import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // this can be a func component as well

  // componentWillUpdate() {
  //   console.log("[OderS] will update");
  // }

  render() {
    // element for <ul>
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
          {this.props.ingredients[igKey]}{" "}
        </li>
      )
    );

    return (
      <Aux>
        <h3>Your Order</h3>

        <p>A decious burger with the following ingredients:</p>

        <ul>{ingredientSummary}</ul>

        <p>
          <strong>Total Price: {this.props.sum.toFixed(2)}</strong>
        </p>

        <p>Continue to Checkout</p>

        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType='Success' clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
