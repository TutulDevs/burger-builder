import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerAction from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false, // to display modal
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  // will be triggered on OrderNow Btn
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  // purchable = false
  updatePurchaseState = (ingredients) => {
    // map the values of the ing obj, add all & compare
    const sum = Object.values(ingredients).reduce((a, c) => a + c, 0);

    // if there's at least one item, purchasable true
    return sum > 0;
  };

  render() {
    // disable the btns whose type has nothing
    const disabledInfo = { ...this.props.ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true, cheese: false} like this

    let orderSummary = null;
    // load ingredients & display
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />

          <BuildControls
            ingredientAdded={this.props.onIngAdded}
            ingredientRemoved={this.props.onIngRemoved}
            disable={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ings)}
            order={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          sum={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngAdded: (ing) => dispatch(burgerAction.addIngredient(ing)),

    onIngRemoved: (ing) => dispatch(burgerAction.removeIngredient(ing)),

    onInitIngredients: () => dispatch(burgerAction.initIngredients()),

    onInitPurchase: () => dispatch(burgerAction.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
