const board = document.getElementById('board');
const cells = Array.from(document.getElementsByClassName('cell'));
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameState[index] !== null || !gameActive) {
        return;
    }
    gameState[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    if (checkWin()) {
        message.innerText = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== null)) {
        message.innerText = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function resetGame() {
    gameState = Array(9).fill(null);
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    gameActive = true;
    message.innerText = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);