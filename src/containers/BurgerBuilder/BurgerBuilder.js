import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false, // to display modal
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  // will be triggered on OrderNow Btn
  purchaseHandler = () => {
    // IF auth, purchase || auth
    if(this.props.isAuthenticated ) {
      this.setState({ purchasing: true }) ;
    } else {
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push("/auth") ;
    }
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
            isAuth={this.props.isAuthenticated}
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
    isAuthenticated: state.auth.token !== null, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngAdded: (ing) => dispatch(actions.addIngredient(ing)),

    onIngRemoved: (ing) => dispatch(actions.removeIngredient(ing)),

    onInitIngredients: () => dispatch(actions.initIngredients()),

    onInitPurchase: () => dispatch(actions.purchaseInit()),

    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)), 
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
