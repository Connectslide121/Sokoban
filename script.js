//***** global variables *****/

let tileMap = tileMap01
let tileType
let playerCoords
let totalGoalCount
let goalCount
let gameCompleted = false

const tileClass = {
    " ": Tiles.Space,
    W: Tiles.Wall,
    B: Entities.Block,
    G: Tiles.Goal,
    P: Entities.Character,
}

const map = document.getElementById("map")

//***** create map *****/

function CreateMap(){

    totalGoalCount = 0
    map.innerHTML = ""    

    for (let y = 0; y < tileMap.height ; y++) {
        for (let x = 0; x < tileMap.width ; x++) {
            let tile = document.createElement("div")
            tile.id = "x" + x + "y" + y; // Set tile ID according to its coords
            tile.className = "tile"; // Set general tile class
    
            tileType = tileMap.mapGrid[y][x][0]
            tile.classList.add(tileClass[tileType]) // Set class according to tile type
    
            if(tileType == "P") {playerCoords = { x, y }} // Set player coordinates
            if(tileType == "G") {totalGoalCount ++} // Set total count of goals
    
            map.appendChild(tile)
        }
    }    

    goalCount = totalGoalCount
}

CreateMap();



//***** player input *****/

function playerInput(event){

    if (event.key == ("ArrowUp") && gameCompleted != true) { movePlayer(0, -1); }
    else if (event.key == ("w") && gameCompleted != true) { movePlayer(0, -1); }
    else if (event.key == ("ArrowLeft") && gameCompleted != true) { movePlayer(-1, 0); }
    else if (event.key == ("a") && gameCompleted != true) { movePlayer(-1, 0); }
    else if (event.key == ("ArrowDown") && gameCompleted != true) { movePlayer(0, 1); }
    else if (event.key == ("s") && gameCompleted != true) { movePlayer(0, 1); }
    else if (event.key == ("ArrowRight") && gameCompleted != true) { movePlayer(1, 0); }
    else if (event.key == ("d") && gameCompleted != true) { movePlayer(1, 0); }
    event.preventDefault();
}

//***** player movement *****/

function movePlayer(moveX, moveY){
    
    let moveIsValid = false

    let targetTiles = [ document.getElementById("x" + playerCoords.x + "y" + playerCoords.y), // current player tile
                        document.getElementById("x" + (playerCoords.x + moveX) + "y" + (playerCoords.y + moveY)), // player targer tile
                        document.getElementById("x" + (playerCoords.x + 2 * moveX) + "y" + (playerCoords.y + 2 * moveY))] // box target tile

    let targetTilesClasses = [targetTiles[0].classList, targetTiles[1].classList, targetTiles[2].classList]


    if (targetTilesClasses[1].contains(Tiles.Space)) 
    {
        moveIsValid = true
    }

    if (targetTilesClasses[1].contains(Tiles.Goal))
    {
        moveIsValid = true
    }

    if (targetTilesClasses[1].contains(Entities.Block) && targetTilesClasses[2].contains(Tiles.Space))
    {
        moveIsValid = true

        targetTiles[2].classList.remove(Tiles.Space)
        targetTiles[2].classList.add(Entities.Block)

    }

    if (targetTilesClasses[1].contains(Entities.Block) && targetTilesClasses[2].contains(Tiles.Goal))
    {
        moveIsValid = true

        targetTiles[2].classList.remove(Tiles.Goal)
        targetTiles[2].classList.add(Entities.BlockDone)

        goalCount--
    }

    if (targetTilesClasses[1].contains(Entities.BlockDone) && targetTilesClasses[2].contains(Tiles.Goal))
    {
        moveIsValid = true

        targetTiles[2].classList.remove(Tiles.Goal)
        targetTiles[2].classList.add(Entities.BlockDone)
    }

    if (targetTilesClasses[1].contains(Entities.BlockDone) && targetTilesClasses[2].contains(Tiles.Space))
    {
        moveIsValid = true

        targetTiles[2].classList.remove(Tiles.Space)
        targetTiles[2].classList.add(Entities.Block)

        goalCount++
    }

    if (moveIsValid == true)
    {
        if (tileMap.mapGrid[playerCoords.y][playerCoords.x][0] == "G")
        {
            targetTiles[0].classList.add(Tiles.Goal)
        }
        else{
            targetTiles[0].classList.add(Tiles.Space)
        }

        playerCoords.x = playerCoords.x + moveX
        playerCoords.y = playerCoords.y + moveY

        targetTiles[0].classList.remove(Entities.Character)
        targetTiles[1].classList= "tile"
        targetTiles[1].classList.add(Entities.Character)
    }

    if (goalCount == 0) {gameComplete()}

    console.log(targetTilesClasses)
    console.log(moveIsValid)
    console.log(goalCount)

}

function gameComplete(){

    gameCompleted = true

}


//***** event listeners *****/

document.addEventListener("keydown", playerInput);
