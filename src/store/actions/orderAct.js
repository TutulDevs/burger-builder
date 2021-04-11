// submit form data to post on Firebase

import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";
import { fetchIngFailed } from "./burgerAct";

// get the id from firebase
export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error: error,
  };
};

// while the purchase is happening
export const purchaseStart = () => {
  return {
    type: actionTypes.PURCHASE_START,
  };
};

// this action starts after clicking the button
export const purchase = (orderData, token) => {
  return (dispatch) => {
    // before posting, send the type via redux
    dispatch(purchaseStart());

    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((res) => {
        //console.log(res.data);
        dispatch(purchaseSuccess(res.data.name, orderData));
      })
      .catch((err) => dispatch(err));
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

// for order page
export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

// func for async code
export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/orders.json" + queryParams )
      .then((res) => {
        // convert obj in arr & keep the keys
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => dispatch(fetchIngFailed(err)));
  };
};
