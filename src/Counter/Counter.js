import React, { useState } from "react";

const Counter = () => {
  const [counterValue, setCounterValue] = useState(0);

  const [inputValue, setInputValue] = useState(1);

  const addToCounter = () => {
    setCounterValue(counterValue + inputValue);
  };

  const subtractFromCounter = () => {
    setCounterValue(counterValue - inputValue);
  };

  return (
    <div>
      <h1 data-testid="header">Test Counter</h1>
      <h2 data-testid="counter">{counterValue}</h2>
      <button data-testid="subtract-btn" onClick={subtractFromCounter}>
        -
      </button>
      <input
        style={{ textAlign: "center" }}
        type="number"
        onChange={({ target }) => setInputValue(parseInt(target.value))}
        data-testid="input"
        value={inputValue}
      />
      <button data-testid="add-btn" onClick={addToCounter}>
        +
      </button>
    </div>
  );
};

export default Counter;
