
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
window.addEventListener('DOMContentLoaded', () => {
    levelCount = document.querySelector('.level-count'); // Get the Text that holds the Level Count
    powerButton = document.getElementById("power-btn"); // Get the Start Buttom
})

// Checks if the user's sequence is the same as the solution sequence by comparing every item of the arrays.
function checkSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        // If the current item from the user's sequence doesn't match the correct sequence, then the user failed to correctly repeat the sequence
        if (userSequence[i] !== sequence[i]) {
            return false;
        }
    }
    // If all the items match between the user sequence and the correct sequence, then the sequences are the same and the user is correct.
    return true;
}

// Function to be ran when the game starts.
function startGame() {
    level = 1;
    levelCount.textContent = level;
    nextRound();
    powerButton.disabled = false;
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