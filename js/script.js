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
const playAgainButton = document.querySelector(".play-again")


//---variable that need to change

//Word to be guessed
let word = "magnolia"

//Empty array for the letters that have been guessed 
let guessedLetters = [];

//remaining guesses allowed by the player. 8 is the max
let remainingGuesses = 8



//-----Async function to get words from JSON files-------------------------------
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolder(word);
  };


  // Fire off the game
  getWord();



//-----Functions to run the game-------------------------------------------------------

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


//Function to capture input(guessed letter) & check to see if you have already guessed that letter.
const makeGuess = function (guess) {

    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You have already guessed that letter. Please try again.`

    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
        updateGuessesRemaining(guess)
    }
}


//Function to show guessed letters
const showGuessedLetters = function () {
    //clear list first
    guessedLettersElement.innerHTML = "";
    
    for (const letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem);
    }    
};


//Function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
   const wordUpper = word.toUpperCase();
   const wordArray = wordUpper.split("");
   const revealWord = [];

   for(const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●")
        }
   }
   wordInProgress.innerText = revealWord.join("")
   checkIfWin();
};


//Function to count remaining guesses 
const updateGuessesRemaining = function (guess) {
   const upperWord = word.toUpperCase();

   if (!upperWord.includes(guess)) {
    message.innertext = `Sorry, the letter ${guess} is not included in the word.`;
    remainingGuesses -= 1;   
   } else {
    message.innertext = `Good guess! The word includes the lettter ${guess}`;
   }

   if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    startOver();
   } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
   } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
   }
};


//Function to see if the player won
const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
        
        startOver();
    }
};


//Function to hide and show elements when the game is over
const startOver = function () {
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

//Add event listenet to play again button
playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    
    guessedLetters = [];
    console.log(guessedLetters);
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;


 
 
    // Grab a new word
    getWord();

    //update hide and show elements for the new game
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
  });
    