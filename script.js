//**** global variables */

let tileMap = tileMap01;
let playerCoords;
let win = false;

const map = document.getElementById("map");

//**** create map */

function CreateMap(){
    for (let y = 0; y < tileMap.height ; y++) {
        for (let x = 0; x < tileMap.width ; x++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.id = "x" + x + "y" + y;
    
            let tileType = tileMap.mapGrid[y][x][0];
    
            if(tileType == "W"){
                tile.classList.add(Tiles.Wall);
            }
    
            else if(tileType == "P")
            {
                tile.classList.add(Entities.Character);
                playerCoords = { x, y }
            }
    
            else if(tileType == "B"){
                tile.classList.add(Entities.Block);
            }
    
            else if(tileType == "G"){
                tile.classList.add(Tiles.Goal);
            }
    
            else{
                tile.classList.add(Tiles.Space)
            }

            map.appendChild(tile);
        }
    }    
}

CreateMap()


//**** player movement */



//**** global variables */