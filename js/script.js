//-----Variable assignments - Globally Scoped--------------------------

//The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters")

//The button with the text “Guess!” in it.
const guessLetterButton = document.querySelector(".guess")

//The text input where the player will guess a letter.
const letterInput= document.querySelector(".letter")

//The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress")

//The paragraph where the remaining guesses will display.
const remainingGuessesElement= document.querySelector(".remaining")

//The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan= document.querySelector(".remaining span")

//The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message")

//The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again hide")

//Word to be guessed
const word = "magnolia"

//Empty array for the letters that have been guessed 
const guessedLetters = [];




//-----Start JS Coding-----------------------------------------------------------

//Function to add placeholders for each Letter
const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (letter of word){
    placeHolderLetters.push("●")   
    }
    wordInProgress.innerText = placeHolderLetters.join(""); 
};

placeHolder(word);



//Event listener for the button
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = "";

    const guess = letterInput.value;
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";

    const gLetter = document.createElement("li");
    gLetter.innertext=guess;
    guessedLettersElement.append(gLetter)
});


//Validate the letters input box
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input.length === 0) {
        message.innerText = `Enter a letter:`;
    } else if (input.length > 1) {
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

