// GameBoard
const GameBoard = () => {
    let position = ['','','','','','','','','']
    let lastMarkedIndex;
    const getPosition =() => position;
    const isValidCell = (cellIndex) => {
        return position[cellIndex] === "";
    }
    const clear = () => {
        position.forEach((pos)=>{
            pos = ""
        })
    }
    const markCell = (cellIndex, mark) => {
        position[cellIndex] = mark
        lastMarked = cellIndex;
    }
    const unmarkedCells = () => {
        let indexes = []
        getPosition().forEach((p,i) => {
            if (p == "") indexes.push(i)
        })
        return indexes
    }
    const full = () => {
        return !position.includes("")
    }
    const lastMarkedCell = () => lastMarkedIndex
    return {getPosition, isValidCell, clear, markCell, unmarkedCells, full}
};

// Player
const Player = (marker, cpu = false) => {
    const getMarker = () => marker;
    const setMarker = (newMarker) => {
        marker = newMarker
    };
    const isCpu = () => cpu;

    return {getMarker, setMarker, isCpu}
}


const DisplayController = (() => {
    const drawBoard = (board_positions) => {    //draw markers on board
        for(let index in board_positions){
            let cellSpan = cells[index].firstChild
            if (cellSpan && cellSpan.tagName.toLowerCase() == 'span'){
                cellSpan.innerText = board_positions[index]
            } else {
                let markerElem =  document.createElement("span");
            
                markerElem.innerText = board_positions[index]
                cells[index].appendChild(markerElem)
            }
        }
    }

    return {drawBoard}
})()

// Game
const Game = (() => {
    let over = true;
    let players = [];
    let board = GameBoard();
    let displayController = DisplayController;
    let markingPlayer;
    let winningPositions = [[0,1,2],[3,4,5],[6,7,8], //horizontals
                            [0,3,6],[1,4,7],[2,5,8], //verticals
                            [0,4,8],[2,4,6] //diag
                        ]

    const start = () => {
        over = false;
        board.clear();
        setPlayers();
        turnStart();
    }

    const setPlayers = () => {
        let playerMarker = document.querySelector('input[name="markerSelect"]:checked').value
        let cpuMarker = document.querySelector('input[name="markerSelect"]:not(:checked)').value
        let p = Player(playerMarker)
        let cpu = Player(cpuMarker, true)

        players.push(p)
        players.push(cpu)

        if (p.getMarker() == "0") {
            changePlayers();
        }

        markingPlayer = players[0]
        
    }

    const placeMark = (e) => {
        markingPlayer.isCpu()
        if(isGameOver()){
            alert('Game Over')
            return;
        } 
        if(markingPlayer.isCpu()) return;

        let playerMark = players[0].getMarker();
        let targCell = e.target

        let cellIndex = Array.prototype.indexOf.call(cells, targCell);

        if (board.isValidCell(cellIndex)){
            board.markCell(cellIndex, playerMark)
            turnEnd();
        }
    }

    const cpuPickCell = () => {
        let openIndexes = board.unmarkedCells()
        let index = openIndexes[Math.floor(Math.random()*openIndexes.length)];
        return index
    }

    const turnStart = () => {
        if(markingPlayer.isCpu()){
            let cellIndex = cpuPickCell();
            if (board.isValidCell(cellIndex)){
                board.markCell(cellIndex, markingPlayer.getMarker())
                turnEnd();
            }
        }
    }
    const turnEnd = () => {
        refresh();
        if(hasWinner()) {
            gameOver();
            return
        }
        if(board.full()){
            gameOver()
            return
        }
        changePlayers();
        turnStart();
    }

    const changePlayers = () => {
        players.reverse();
        console.log({cpu: players[0].isCpu()});
        markingPlayer = players[0];
    }

    const refresh = () => {
        displayController.drawBoard(board.getPosition())
    }

    const isGameOver = () => over;

    const gameOver = () => {
        over = true
    }

    const hasWinner = () => {
        let curBoard = board.getPosition();
        let win = false
        winningPositions.forEach(combo => {
            let comboMarks = []
            combo.forEach(pos => {
                comboMarks.push(curBoard[pos])
            })

            if(comboMarks.every((pos) => pos == markingPlayer.getMarker())){
                win = true
                return
            }
        })
        return win
    }

    return {start, placeMark}
})();

const gameStartButton = document.querySelector('#game-start')
const boardContainer = document.querySelector(".board");
const cells = boardContainer.querySelectorAll(".cell")

cells.forEach(cell => {
    cell.addEventListener("click", Game.placeMark)
})

gameStartButton.addEventListener("click", Game.start)
