// script.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

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
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusText.innerHTML = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerHTML = `It's ${currentPlayer}'s turn`;
}

function handleRestartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerHTML = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerHTML = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
statusText.innerHTML = `It's ${currentPlayer}'s turn`;
