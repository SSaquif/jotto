import PropTypes from "prop-types";

const GuessedWords = ({ guessedWords }) => {
  return (
    <div data-test="guessedWords-component">
      {guessedWords.length === 0 ? (
        <h3 data-test="guessing-instructions">Guess the Secret Word!!</h3>
      ) : (
        <div data-test="guessed-words-section">
          <h3>Guessed Words</h3>
          <table>
            <thead>
              <tr>
                <th>Guess</th>
                <th>Matching Letters</th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map((word, index) => {
                return (
                  <tr key={index} data-test="guessed-word">
                    <td>{word.guessedWord}</td>
                    <td>{word.matchedLetterCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
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
