import PropTypes from "prop-types";

const GuessedWords = ({ guessedWords }) => {
  return (
    <>
      {guessedWords.length === 0 ? (
        <div data-test="guessedWords-component">
          <h2 data-test="guessing-instructions">Guess the Secret Word!!</h2>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      matchedLetterCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GuessedWords;
