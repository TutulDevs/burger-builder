import React from "react";
import classes from "./Order.css";

const order = (props) => {
  const ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName],
    });
  }

  const ingOutput = ingredients.map((el, i) => {
    return (
      <span
        key={i}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "3px",
          padding: "2px 5px",
          border: "1px solid #cccccc",
        }}
      >
        {el.name} ({el.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOutput}</p>

      <p>
        Price: <strong> USD {Number(props.price).toFixed(2)} </strong>
      </p>
    </div>
  );
};

export default order;
