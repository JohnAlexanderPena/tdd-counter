import React from "react";
import Counter from "../Counter";

//Render in virtual dom for testing//
import { render, fireEvent, screen, cleanup } from "@testing-library/react";

//expect keyword
import "@testing-library/jest-dom/extend-expect";
import { getTTFB } from "web-vitals";

//declare tests

//set global variable
let getByTestId;

//Run before each function
beforeEach(() => {
  const component = render(<Counter />);

  getByTestId = component.getByTestId;
});

test("header renders with correct text", () => {
  //get element matching Id assigned to component
  const headerEl = getByTestId("header");

  //declare what we expect to happen or do
  expect(headerEl.textContent).toBe("Test Counter");
});

test("counter starts with text of  0", () => {
  const counterElem = getByTestId("counter");

  expect(counterElem.textContent).toBe("0");
});

test("input has starting value of 1", () => {
  const inputEle = getByTestId("input");

  expect(inputEle.value).toBe("1");
});

test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");

  expect(addBtn.textContent).toBe("+");
});

test("add button renders with -", () => {
  const subtractBtn = getByTestId("subtract-btn");

  expect(subtractBtn.textContent).toBe("-");
});

test("able to change input value", () => {
  const inputEle = getByTestId("input");

  expect(inputEle.value).toBe("1");

  fireEvent.change(inputEle, {
    target: { value: "5" },
  });

  expect(inputEle.value).toBe("5");
});

test("adds 1 to counter after clicking on + button", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");

  fireEvent.click(addBtnEl);

  expect(counterEl.textContent).toBe("1");
});

test("subtracts 1 to counter after clicking on - button", () => {
  const subBtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");

  fireEvent.click(subBtnEl);

  expect(counterEl.textContent).toBe("-1");
});

test("change input value then clicking on add btn works correctly", () => {
  const addBtn = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });
  fireEvent.click(addBtn);

  expect(counterEl.textContent).toBe("5");
});

test("change input value then clicking on subtract btn works correctly", () => {
  const subBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });
  fireEvent.click(subBtn);

  expect(counterEl.textContent).toBe("-5");
});

test("adding and then subtracting leads to correct coutner num", () => {
  const addBtn = getByTestId("add-btn");
  const subBtn = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "10",
    },
  });

  for (let i = 0; i < 3; i++) {
    fireEvent.click(addBtn);
  }

  for (let i = 0; i < 4; i++) {
    fireEvent.click(subBtn);
  }

  expect(counterEl.textContent).toBe("-10");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  for (let i = 0; i < 3; i++) {
    fireEvent.click(addBtn);
  }

  for (let i = 0; i < 2; i++) {
    fireEvent.click(subBtn);
  }

  expect(counterEl.textContent).toBe("-5");
});

test("counter contains correct classname", () => {
  const counterElem = getByTestId("counter");
  const inputElem = getByTestId("input");
  const addBtn = getByTestId("add-btn");
  const subBtn = getByTestId("subtract-btn");

  fireEvent.change(inputElem, {
    target: {
      value: "50",
    },
  });

  fireEvent.click(addBtn);

  expect(counterElem.className).toBe("");

  fireEvent.click(addBtn);

  expect(counterElem.className).toBe("green");

  fireEvent.click(addBtn);

  expect(counterElem.className).toBe("green");

  fireEvent.click(subBtn);
  fireEvent.click(subBtn);

  expect(counterElem.className).toBe("");

  fireEvent.click(subBtn);
  fireEvent.click(subBtn);
  fireEvent.click(subBtn);
  fireEvent.click(subBtn);

  expect(counterElem.className).toBe("red");
});
