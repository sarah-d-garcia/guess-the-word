
const guessedLettersElement = document.querySelector(".guessed-letters")
const guessLetterButton = document.querySelector(".guess")
const letterInput= document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress")
const remainingGuessesElement= document.querySelector(".remaining")
const remainingGuessesSpan= document.querySelector(".remaining span")
const message = document.querySelector(".message")
const playAgainButton = document.querySelector(".play-again hide")

const word = "magnolia"
const guessedLetters = [];

const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (Letter of word){
    placeHolderLetters.push("●")   
    }
    wordInProgress.innerText = placeHolderLetters.join(""); 
};

placeHolder(word);


guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = "";

    const guess = letterInput.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});



const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        message.innerText = `Enter a letter:`;
    } else if (input.lenght > 1) {
        message.innerText = `You can only guess 1 letter at a time.`;
    } else if (!input.match(acceptedLetter)) {
        message.innerText = `You can only enter letters.`;
    } else {
        return input;
    }
};

const makeGuess = function (guess) {

    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You have already guessed that letter. Please try again.`

    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}

