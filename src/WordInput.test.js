import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";

import WordInput from "./WordInput";

// this will allow us to import hooks
// const mockSetCurrentGuess = jest.fn();

// jest.mock("react", () => {
//   return {
//     ...jest.requireActual("react"),
//     useState: (initailState) => [initailState, mockSetCurrentGuess],
//   };
// });

const setup = (success = "false", secretWord = "plane") => {
  return shallow(<WordInput success={success} secretWord={secretWord} />);
};

test("does not throw warning with expected props", () => {
  checkProps(WordInput, { secretWord: "plane" });
});

describe("render", () => {
  // Word has been guessed
  let wrapper;
  describe("succes is true, word was guessed", () => {
    beforeEach(() => {
      wrapper = setup(true);
    });

    test("component renders without errors", () => {
      const component = findByTestAttr(wrapper, "wordInput-component");
      expect(component.length).toBe(1);
    });

    test("input box does not show", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(false);
    });

    test("submit button does not show", () => {
      const button = findByTestAttr(wrapper, "submit-button");
      expect(button.exists()).toBe(false);
    });
  });

  // Word has not been guessed
  describe("succes is false, word was not guessed", () => {
    beforeEach(() => {
      wrapper = setup(false);
    });

    test("component renders without errors", () => {
      const component = findByTestAttr(wrapper, "wordInput-component");
      expect(component.length).toBe(1);
    });

    test("input box shows", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(true);
    });

    test("submit shows", () => {
      const button = findByTestAttr(wrapper, "submit-button");
      expect(button.exists()).toBe(true);
    });
  });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    // Get Shallow Wrapper AFTER Setting up mocks
    wrapper = setup(false);
  });

  afterEach(() => {
    React.useState = originalUseState;
  });

  test("state updates with value of input box upon change", () => {
    // Mocking setState and useState functions
    // We don't care what mockSetCurrentGuess returns
    // We do care about are useState mock returning
    // mockSetCurrentGuess as the second item,
    // currentGuess = ""
    // setCurrentGuess = mockSetCurrentGuess
    // Now has been moved up to global scope
    // Update: moved up to beforeEach in describe
    // Probably can move up to global scope if we
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    // Getting my input box in a Shallow wrapper

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

  test("My updated test", () => {
    React.useState = originalUseState;

    // Getting my input box in a Shallow wrapper
    // Have to redo this otherwise test fails
    // I guessing it's because I remocked usestate
    const wrapper = setup(false);
    const inputBox = findByTestAttr(wrapper, "input-box");
    console.log(inputBox.debug());

    // Mocking a on Change event
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    const newInputBox = findByTestAttr(wrapper, "input-box");
    console.log(newInputBox.debug());

    expect(newInputBox.get(0).props.value).toBe("train");
  });

  test("field i cleared aftr clicking submit", () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    const submitButton = findByTestAttr(wrapper, "submit-button");

    const mockedEvent = { preventDefault: () => {} };
    submitButton.simulate("click", mockedEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
