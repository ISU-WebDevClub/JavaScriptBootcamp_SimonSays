
// Definitions for DOM elements to be set once the DOM Content is Loaded. Currently undefined
let levelCount;
let powerButton;

// Whether or not the game has started. Will 
let gameStarted = false;
let level = 1;

// The Correct Sequence
const sequence = [];
// The Sequence entered by the user. Needs to be compared to the correct sequence after each round to determine if the user is correct.
let userSequence = [];

// When the DOM / Template is loaded, we can now populate these variables with the data from the DOM
// !!! WORKSHOP ITEM: DOM QUERYING !!! Fill out the levelCount and powerButton variables to load the correct data (HINT: check the html)
window.addEventListener('DOMContentLoaded', () => {

    levelCount = document.querySelector('.IM NOT CORRECT UH OHHH'); // Change this query selector to query for the component that should hold the level count using the correct CSS class

    powerButton = document.getElementById("IM NOT A REAL ID :("); // Change this query selector to  get the component for the start button using the correct id
})

// Function to be ran when the game starts.
// !!! WORKSHOP ITEM: SETTING VARIABLES AND THEIR PROPERTIES !!! 
function startGame() {
    // Set the level variable here, What value should it be when the game starts??
    
    // ____________________________________________

    // Set the text of the levelCount element here!
    
    // ____________________________________________

    nextRound();
    powerButton.disabled = false;
}

// Checks if the user's sequence is the same as the solution sequence by comparing every item of the arrays.
// !!! WORKSHOP ITEM: LOOPS !!!
function checkSequence() {
    // In this function, you should use some function to check every item of the userSequence and the sequence arrays. If any are different, then this should return false, otherwise it should return true!
    // Hint: Remember the loops that we went over
}

// Every round, we need to add an item to the sequence, then play the animation
function nextRound() {
    addToSequence();
    playSequence();
}

function addToSequence() {
    // Choose a random number between 1 and 4 to add to the sequence
    const randomColor = Math.floor(Math.random() * 4) + 1;
    // Add the random item to the sequence
    sequence.push(randomColor);
}

function playSequence() {
    let i = 0;
    const intervalId = setInterval(() => {
        highlightButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(intervalId);
            enableButtons();
        }
    }, 1000);
}

// Upon click, this function will be called where 'button' is a reference to whichever button was pressed in the DOM
function handleClick(button) {
    if (gameStarted) {
        // Get the 'data-color' value from each button in the DOM
        const userColor = button.getAttribute("data-color");
        // Add the clicked button to the user's sequence
        userSequence.push(Number(userColor));

        highlightButton(userColor);
        if (!checkSequence()) {
            alert(`Wrong sequence! Press Start to try again
                from current level.\nFINAL SCORE: ${level}`);
                userSequence = [];
                document.getElementById('power-btn')
                .addEventListener('click', () => {
                    playSequence();
                })
        } else if (userSequence.length === sequence.length) {
            userSequence = [];
            level++;
            levelCount.textContent = level;
            /*Can change level as per convenience or if we want the game to 
            continue indefinitely, can omit if-else condition */
            if (level <= 20) {
                setTimeout(() => nextRound(), 1000);
            } else {
                alert("Congratulations! You won!");
                startGame();
            }
        }
    }
}

// Get whichever button should be highlighted (Uses the data-color attribute to find it)
function highlightButton(color) {
    const button = document
    .querySelector(`[data-color="${color}"]`);
    if (Number(color) == 1) {
        button.style.backgroundColor = 'lightgreen'
    }
    else if (Number(color) == 2) {
        button.style.backgroundColor = 'tomato'
    }
    else if (Number(color) == 3) {
        button.style.backgroundColor = 'yellow'
    }
    else if (Number(color) == 4) {
        button.style.backgroundColor = 'lightskyblue'
    }
    setTimeout(() => {
        button.attributes.removeNamedItem('style');
    }, 300);
}

// Re-enable buttons when the user should enter their sequence
function enableButtons() {
    const buttons = document
    .querySelectorAll('.simon-btn');
    buttons.forEach(button => 
    button.removeAttribute('disabled'));
}

// Disable buttons while the animation is playing
function disableButtons() {
    const buttons = document
    .querySelectorAll('.simon-btn');
    buttons.forEach(button => 
    button.setAttribute('disabled', 'true'));
}

// Function to start / reset game
function togglePower() {
    gameStarted = !gameStarted;

    if (gameStarted) {
        startGame();
        enableButtons();
        powerButton.disabled = false;
        powerButton.textContent = "End Game"
    } else {
        userSequence = [];
        disableButtons();
        powerButton.disabled = true;
        powerButton.textContent = "Start Game"
    }
}