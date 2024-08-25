let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell)) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board.fill(null);
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => (cell.textContent = ''));
}
