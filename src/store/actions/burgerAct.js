import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

// to supplement the below function- fucking -tion shauwa
export const setIngs = (ings) => {
  // return an act that you want to dispatch. So get actType
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings,
  };
};

export const fetchIngFailed = () => {
  return { type: actionTypes.SET_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        "https://burger-ee3f7-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((res) => {
        dispatch(setIngs(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngFailed());
      });
  };
};
