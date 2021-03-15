import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

// array to map later
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p className={classes.TotalPrice}>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((el) => (
        <BuildControl
          key={el.label}
          label={el.label}
          added={() => props.ingredientAdded(el.type)}
          removed={() => props.ingredientRemoved(el.type)}
          disable={props.disable[el.type]}
        />
      ))}

      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.order}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;

// added={ () => props.ingadded(el.type) }
