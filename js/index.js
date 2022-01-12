// GameBoard
const GameBoard = () => {
    let position = ['','','','','','','','','']
    const isValidCell = (targCell) => {
        return targCell.innerText === "";
    }
    const clear = () => {
        position = ['','','','','','','','','']
    }
    const markCell = (targCell, mark) => {
        let index = targCell.dataset.id
        position[index] = mark
        console.log(position);
    }
    return {position, isValidCell, clear, markCell}
};

// Player
const Player = (marker) => {
    const setMarker = (newMarker) => {
        marker = newMarker
    };
    return {marker, setMarker}
}


const DisplayController = (() => {
    const drawBoard = (board_positions) => {    //draw markers on board
        for(let index in board_positions){
            let markerElem =  document.createElement("span");
            markerElem.dataset.id = index
    
            markerElem.innerText = board_positions[index]
            cells[index].appendChild(markerElem)
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
        board.clear();
        setPlayers();
        refresh()
    }

    const setPlayers = () => {
        let playerMarker = document.querySelector('input[name="markerSelect"]:checked').value
        let cpuMarker = document.querySelector('input[name="markerSelect"]:not(:checked)').value
        let p = Player(playerMarker)
        let cpu = Player(cpuMarker)

        players.push(p)
        players.push(cpu)
    }

    const placeMark = (e) => {
        let playerMark = players[0].marker
        let targCell = e.target.firstChild

        if (board.isValidCell(targCell)){
            board.markCell(targCell, playerMark)
            refresh()
        }
    }

    const refresh = () => {
        console.log(board.position);
        displayController.drawBoard(board.position)
    }
    return {start, placeMark, players, board}
})();

const gameStartButton = document.querySelector('#game-start')
const boardContainer = document.querySelector(".board");
const cells = boardContainer.querySelectorAll(".cell")

cells.forEach(cell => {
    cell.addEventListener("click", Game.placeMark)
})

gameStartButton.addEventListener("click", Game.start)
