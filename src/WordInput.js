import React from "react";
import PropTypes from "prop-types";

const WordInput = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");

  return (
    <div data-test="wordInput-component">
      <form>
        <input
          data-test="input-box"
          type="text"
          placeholder="Guess a Word"
          value={currentGuess}
          onChange={(ev) => setCurrentGuess(ev.target.value)}
        />
        <button
          data-test="submit-button"
          type="submit"
          onClick={(ev) => {
            ev.preventDefault();
            setCurrentGuess("");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

WordInput.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default WordInput;
