import * as actType from "../actions/actionsTypes";
import { updateObj } from "../utility";

const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIng = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true, 
  };
  return updateObj(state, updatedState);
};

const removeIng = (state, action) => {
  const updatedIngredient_r = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients_r = updateObj(
    state.ingredients,
    updatedIngredient_r
  );
  const updatedState_r = {
    ingredients: updatedIngredients_r,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true, 
  };

  return updateObj(state, updatedState_r);
};

const setIng = (state, action) => {
  const updatedState_s = {
    // Re-arrange the items sorting
    ingredients: {
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
      bacon: action.ingredients.bacon,
    },
    totalPrice: 4, // initState.totalPrice
    error: false,
    building: false,
  };
  return updateObj(state, updatedState_s);
};

const setIngFail = (state, action) => {
  return updateObj(state, { error: true });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actType.ADD_INGREDIENT:
      return addIng(state, action);

    case actType.REMOVE_INGREDIENT:
      return removeIng(state, action);

    // init the initial ingredients from server
    case actType.SET_INGREDIENTS:
      return setIng(state, action);

    case actType.SET_INGREDIENTS_FAILED:
      return setIngFail(state, action);

    default:
      return state;
  }
};

export default reducer;
