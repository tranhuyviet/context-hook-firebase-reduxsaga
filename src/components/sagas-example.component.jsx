import React from "react";
import { connect } from "react-redux";

import Card from "./card/card.component";
import { onIncrement, onDecrement } from "../redux/app.action";

const SagasExample = ({ value, increment, decrement }) => {
  return (
    <Card>
      {value}
      <button onClick={increment}>Add 1</button>
      <button onClick={decrement}>Minus 1</button>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    value: state.app.value
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // increment: () => dispatch({ type: "INCREMENT" }),
    // decrement: () => dispatch({ type: "DECREMENT" })
    increment: () => dispatch(onIncrement()),
    decrement: () => dispatch(onDecrement())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SagasExample);
