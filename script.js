//**** global variables */

var tileMap = tileMap01;
var playerX;
var playerY;

const map = document.getElementById("map");



//**** create map */

function CreateMap(){
    for (let x = 0; x < tileMap.mapGrid.length; x++) {
        for (let y = 0; y < tileMap.mapGrid[x].length; y++) {
            const tile = document.createElement("img");
            tile.className = "tile";
            tile.id = "x" + x + "y" + y;
    
            let tileType = tileMap.mapGrid[x][y][0];
    
            if(tileType == "W"){
                tile.classList.add(Tiles.Wall);
                tile.src = "images/wall.png";
            }
    
            else if(tileType == "P")
            {
                tile.classList.add(Entities.Character);
                tile.src = "images/player.png";
                playerX = x;
                playerY = y;
            }
    
            else if(tileType == "B"){
                tile.classList.add(Entities.Block);
                tile.src = "images/box.png";
            }
    
            else if(tileType == "G"){
                tile.classList.add(Tiles.Goal);
                tile.src = "images/goal.png";
            }
    
            else{
                tile.classList.add(Tiles.Space)
                tile.src = "images/blank.png";
            }

            map.appendChild(tile);
        }
    }    
}

CreateMap()


//**** player movement */



//**** global variables */