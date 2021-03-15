import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  //console.log(transformedIngredients);

  if (transformedIngredients.length === 0) {
    transformedIngredients = (
      <p>
        Please add items
        <span role='img' aria-label='wink'>
          😉
        </span>
      </p>
    );
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

export default burger;

/*
function myHelper(ing) {
        let myArray = [];
        
        for(let i=0; i< props.ingredients[ing]; i++){
            myArray.push(<BurgerIngredient key={ing + i} type={ing} />)
        }
        return myArray
 }
 
 const transformedArray = Object.keys(props.ingredients)
        .map(ing => myHelper(ing)} )
*/
