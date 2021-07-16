/**
 * @method getLetterMatchCount
 * @param {string} guessedWord - Guessed word
 * @param {string} secretWord  - Secret Word
 * @returns {number} - Number of letters matched between guessed word and secret word
 */
export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetters = secretWord.split("");

  // It's more efficient to use a set than another array
  const guessedLetterSet = new Set(guessedWord);
  console.log(guessedLetterSet);

  let matchedArray = secretLetters.filter((letter) =>
    guessedLetterSet.has(letter)
  );

  return matchedArray.length;
}
