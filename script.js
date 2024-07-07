document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const resetBtn = document.getElementById('resetBtn');
    const message = document.getElementById('message');
    const player1Choice = document.getElementById('player1Choice');
    const player2Choice = document.getElementById('player2Choice');
    const startBtn = document.getElementById('startBtn');
    const playerChoiceContainer = document.getElementById('playerChoice');
    
    let currentPlayer = 'X';
    let boardState = Array(9).fill(null);
    let player1;
    let player2;

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

    function handleClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] || checkWinner()) {
            return;
        }

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWinner()) {
            message.textContent = `${currentPlayer} wins!`;
        } else if (boardState.every(cell => cell)) {
            message.textContent = `It's a tie!`;
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function resetGame() {
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = player1;
        message.textContent = '';
    }

    function startGame() {
        player1 = player1Choice.value;
        player2 = player2Choice.value;

        if (player1 === player2) {
            message.textContent = 'Player 1 and Player 2 cannot choose the same marker.';
            return;
        }

        playerChoiceContainer.style.display = 'none';
        gameBoard.style.display = 'grid';
        resetBtn.style.display = 'inline-block';
        currentPlayer = player1;
        message.textContent = '';
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetBtn.addEventListener('click', resetGame);
    startBtn.addEventListener('click', startGame);
});
