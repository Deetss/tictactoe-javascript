// GameBoard
const GameBoard = () => {
    let board = ['','','','','','','','','']
    return {board}
};

// Player
const Player = (marker) => {
    const getMarker = () => marker;
}


const DisplayController = (() => {
    const drawBoard = (board) => {
        console.log("Drawing board")
        console.log(board);
    }

    return {drawBoard}
})()

// Game
const Game = (() => {
    let over = false;
    let players = [];
    let board = GameBoard();
    let displayController = DisplayController;

    const start = () => {
        displayController.drawBoard(board)
    }
    return {start, players, board}
})();

Game.start();
