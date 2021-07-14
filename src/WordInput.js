import React from "react";
import PropTypes from "prop-types";

const WordInput = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");

  return (
    <div data-test="wordInput-component">
      <form>
        <input
          value={currentGuess}
          onChange={(ev) => setCurrentGuess(ev.target.value)}
          data-test="input-box"
          type="text"
          placeholder="Guess a Word"
        />
        <button
          data-test="submit-button"
          onClick={(ev) => {
            ev.preventDefault();
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
