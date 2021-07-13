import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import GuessedWords from "./GuessedWords";

const defaultProps = {
  guessedWords: [{ guessedWord: "train", matchedLetterCount: 3 }],
};

/**
 * Factory Functional to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps} />);
};

test("does not throw warning with expeected props", () => {
  checkProps(GuessedWords, defaultProps);
});

describe("if no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    // Overwriting Default Props as we need empty array
    wrapper = setup({ guessedWords: [] });
  });
  test("renders without error", () => {
    const guessedWordsComponent = findByTestAttr(
      wrapper,
      "guessedWords-component"
    );
    expect(guessedWordsComponent.length).toBe(1);
  });
  test("renders instruction to guess a word error", () => {
    const instructions = findByTestAttr(wrapper, "guessing-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});

describe("if there are words guessed", () => {});
