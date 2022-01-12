// GameBoard
const GameBoard = () => {
    let position = ['X','X','O','O','O','X','X','X','X']
    return {position}
};

// Player
const Player = (marker) => {
    const getMarker = () => marker;
    return {getMarker}
}


const DisplayController = (() => {
    const container = document.querySelector(".game-container");
    const drawBoard = (board_positions) => {
        console.log("Drawing board")
        for(let marker in board_positions){
            let markerElem =  document.createElement("div");
            let style = markerElem.style;
            style.display = "flex";
            style.flexWrap = "wrap"

            markerElem.innerHTML = board_positions[marker]
            container.appendChild(markerElem)
        }
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
        setPlayers();
        displayController.drawBoard(board.position)
    }

    const setPlayers = () => {
        let p1 = Player("X")
        let p2 = Player("O")

        players.push(p1)
        players.push(p2)
    }
    return {start, players, board}
})();

Game.start();
