const board = [];
const BOARDWIDTH = 26, BOARDHEIGHT = 16;

var snakeX;
var snakeY;
var snakeDirection;
var snakeLength;

// Create board entirely out of div elements, and style them to look
// like cells, apples, and the snake.
function initGame() {

    const boardElement = document.getElementById('board');

    for(var y = 0; y < BOARDHEIGHT; ++y) {
        var row = [];

        for(var x = 0; x < BOARDWIDTH; ++x) {
            // Each cell is defined by an object which will contain
            // the state for each cell.
            // The tail of the snake is kept track of here.
            var cell = {
                snake: 0,
                apple: 0
            };

            // Create a div and store it in the cell object
            cell.element = document.createElement('div');

            // Add it to the board
            boardElement.appendChild(cell.element);

            // Add to list of all
            row.push(cell);
        }

        // Add this row to the board
        board.push(row);
    }

    startGame();

    gameLoop();
}

// Function to set all properties to default values at start of game
function startGame() {
    // Default position for the snake in the middle of the board
    snakeX = Math.floor(BOARDWIDTH / 2);
    snakeY = Math.floor(BOARDHEIGHT / 2);
    snakeLength = 4;
    snakeDirection = 'Up';

    // Set the center of the board to contain a snake
    board[snakeY][snakeX].snake = snakeLength;

    // Clear the board
    for(var y = 0; y < BOARDHEIGHT; ++y) {
        for(var x = 0; x < BOARDWIDTH; ++x) {
            board[y][x].snake = 0;
            board[y][x].apple = 0;
        }
    }

    board[snakeY][snakeX].snake = snakeLength;

    placeApple();
}

async function gameLoop() {
    // Update position depending on which direction the snake is moving
    switch (snakeDirection) {
        case 'Up':
            snakeY--;
            break;
        case 'Down':
            snakeY++;
            break;
        case 'Left':
            snakeX--;
            break;
        case 'Right':
            snakeX++;
            break;
    }

    // Wall collision
    if (snakeX < 0 || snakeY < 0 || snakeX >= BOARDWIDTH || snakeY >= BOARDHEIGHT) {
        await sleep(1000);
        startGame();
    }

    // Tail collision
    if (board[snakeY][snakeX].snake > 0) {
        await sleep(1000);
        startGame();
    }

    if (board[snakeY][snakeX].apple === 1) {
        snakeLength++;
        board[snakeY][snakeX].apple = 0;
        placeApple();
    }

    // Update board at the new snake position
    board[snakeY][snakeX].snake = snakeLength;

    // Loop over entire board, and update every cell
    for(var y = 0; y < BOARDHEIGHT; ++y) {
        for(var x = 0; x < BOARDWIDTH; ++x) {
            var cell = board[y][x];

            if (cell.snake > 0) {
                cell.element.className = 'snake';
                cell.snake -= 1;
            }
            else if (cell.apple === 1) {
                cell.element.className = 'apple';
            }
            else {
                cell.element.className = '';
            }
        }
    }

    var snakeSpeed = 1000 / snakeLength;

    // Cap the snake speed so it doesn't get too fast as the snake keeps growing
    if(snakeLength >= 14) {
        snakeSpeed = 1000 / 14;
    }

    setTimeout(gameLoop, snakeSpeed);
}

// Handle input from beyboard (no mobile support yet)
function enterKey(event) {
    // Update direction depending on key hit
    switch (event.key) {
        case 'ArrowUp':
            if(snakeDirection == 'Down') break;
            snakeDirection = 'Up';
            break;
        case 'ArrowDown':
            if(snakeDirection == 'Up') break;
            snakeDirection = 'Down';
            break;
        case 'ArrowLeft':
            if(snakeDirection == 'Right') break;
            snakeDirection = 'Left';
            break;
        case 'ArrowRight':
            if(snakeDirection == 'Left') break;
            snakeDirection = 'Right';
            break;
        default:
            return;
    }

    // This prevents the arrow keys from scrolling the window
    event.preventDefault();
}

function placeApple() {
    // Random coordinate for the apple
    var appleX = Math.floor(Math.random() * BOARDWIDTH);
    var appleY = Math.floor(Math.random() * BOARDHEIGHT);

    board[appleY][appleX].apple = 1;

}

// Homemade sleep function
function sleep_old(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

// Better homemade sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}