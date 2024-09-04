const board = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");
const winLine = document.getElementById("win-line");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];


const updateStatusMessage = (message) => {
  statusDisplay.textContent = message;
};


const drawWinLine = (condition) => {
  const [start, , end] = condition;
  const startX = board[start].offsetLeft + board[start].offsetWidth / 2;
  const startY = board[start].offsetTop + board[start].offsetHeight / 2;
  const endX = board[end].offsetLeft + board[end].offsetWidth / 2;
  const endY = board[end].offsetTop + board[end].offsetHeight / 2;

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  winLine.style.width = `${length}px`;
  winLine.style.height = '6px';
  winLine.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
  winLine.style.display = 'block';
};


const checkWin = () => {
  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      updateStatusMessage(`Player ${currentPlayer} wins!`);
      gameActive = false;
      drawWinLine(condition); 
      return true;
    }
  }
  return false;
};


const checkDraw = () => {
  if (gameState.every(cell => cell)) {
    updateStatusMessage("It's a draw!");
    gameActive = false;
    return true;
  }
  return false;
};


const handleCellClick = (event) => {
  const clickedCell = event.target;
  const cellIndex = clickedCell.getAttribute("data-index");

  if (gameState[cellIndex] !== "" || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWin()) return;
  if (checkDraw()) return;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatusMessage(`Player ${currentPlayer}'s turn`);
};


const resetGame = () => {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  board.forEach(cell => cell.textContent = "");
  winLine.style.width = "0"; 
  updateStatusMessage(`Player ${currentPlayer}'s turn`);
  winLine.style.display = 'none'; 
};


board.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);


updateStatusMessage(`Player ${currentPlayer}'s turn`);
