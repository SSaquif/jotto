import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";

import WordInput from "./WordInput";

const setup = (secretWord = "plane") => {
  return shallow(<WordInput secretWord={secretWord} />);
};

// this will allow us to import hooks
// const mockSetCurrentGuess = jest.fn();

// jest.mock("react", () => {
//   return {
//     ...jest.requireActual("react"),
//     useState: (initailState) => [initailState, mockSetCurrentGuess],
//   };
// });

test("does not throw warning with expected props", () => {
  checkProps(WordInput, { secretWord: "plane" });
});

test("component renders without errors", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "wordInput-component");
  expect(component.length).toBe(1);
});

describe("state controlled input field", () => {
  // had to move this test to the top
  // need to remove beforeEach for this to work

  // test("My updated test", () => {
  //   // mockSetCurrentGuess.mockRestore();
  //   // jest.mock("react", () => {
  //   //   return { ...jest.requireActual("react") };
  //   // });

  //   // Getting my input box in a Shallow wrapper
  //   const wrapper = setup();
  //   const inputBox = findByTestAttr(wrapper, "input-box");
  //   console.log(inputBox.debug());

  //   // Mocking a on Change event
  //   const mockEvent = { target: { value: "train" } };
  //   inputBox.simulate("change", mockEvent);

  //   const newInputBox = findByTestAttr(wrapper, "input-box");
  //   console.log(newInputBox.debug());

  //   expect(newInputBox.get(0).props.value).toBe("train");
  // });

  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    // Get Shallow Wrapper AFTER Setting up mocks
    wrapper = setup();
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

  test("field i cleared aftr clicking submit", () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

    const submitButton = findByTestAttr(wrapper, "submit-button");

    const mockedEvent = { preventDefault: () => {} };
    submitButton.simulate("click", mockedEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
