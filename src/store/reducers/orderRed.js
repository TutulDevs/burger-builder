import * as actionsTypes from "../actions/actionsTypes";
import { updateObj } from "../utility";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

// normal reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_START:
      return updateObj(state, { loading: true });

    case actionsTypes.PURCHASE_INIT:
      return updateObj(state, { purchased: false });

    case actionsTypes.PURCHASE_SUCCESS:
      const newOrder = updateObj(action.orderData, { id: action.orderId });

      return updateObj(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      });
    case actionsTypes.PURCHASE_FAIL:
      return updateObj(state, { loading: false });

    // for orders page
    case actionsTypes.FETCH_ORDERS_START:
      return updateObj(state, { loading: false });

    case actionsTypes.FETCH_ORDERS_SUCCESS:
      return updateObj(state, {
        loading: false,
        orders: action.orders,
      });

    case actionsTypes.FETCH_ORDERS_FAIL:
      return updateObj(state, { loading: false });

    default:
      return state;
  }
};

export default reducer;
