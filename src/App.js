import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";

function App() {
  return (
    <div>
      <h1>Jotto</h1>
      <Congrats success={false} />
      <GuessedWords
        guessedWords={[
          { guessedWord: "train", matchedLetterCount: 3 },
          { guessedWord: "plane", matchedLetterCount: 1 },
          { guessedWord: "crane", matchedLetterCount: 5 },
        ]}
      />
    </div>
  );
}

export default App;
