import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";

import WordInput from "./WordInput";

const setup = (secretWord = "plane") => {
  return shallow(<WordInput secretWord={secretWord} />);
};

test("does not throw warning with expected props", () => {
  checkProps(WordInput, { secretWord: "plane" });
});

test("component renders without errors", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "wordInput-component");
  expect(component.length).toBe(1);
});

describe("state controlled input field", () => {
  // I dont like this test, discuss why  in the notes repo
  // Also left a question regarding this on the course video
  test("state updates with value of input box upon change", () => {
    // Mocking setState and useState functions
    // We don't care what mockSetCurrentGuess returns
    // We do care about are useState mock returning
    // mockSetCurrentGuess as the second item,
    // currentGuess = ""
    // setCurrentGuess = mockSetCurrentGuess
    const mockSetCurrentGuess = jest.fn();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    // Getting my input box in a Shallow wrapper
    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");

    // Mocking a on Change event
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    // Finally we are saying
    // once the onChange is simulate as per above code
    // we expect the mockSetCurrentGuess to run
    // with 'train' as input
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
});
