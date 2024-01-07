let gameStatus = 1

class ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.Sunk = false;
    }
    hit(){
        this.hits++;
    }
    isSunk(){
        if(this.hits >= this.length){
            this.Sunk = true;
        }
    }
}

class gameboard{
    constructor(){
        this.board = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,0,0,0,0],
           
        ]
        this.ships = [];
        
        
    }
    placeShip(x,y,shipLength){
        const s = {
            ship : new ship(shipLength),
            x : x,
            y : y,
            hp : shipLength
        }
        this.ships.push(s)
        for(let i = x;i<shipLength+x;i++){
            this.board[y][i] = 1;
        }
        
    }
    receiveAttack(x,y){
        for(let i = 0;i<this.ships.length;i++){
            let shipX = this.ships[i].x + this.ships[i].ship.length - 1 
            if(this.ships[i].y == y && this.ships[i].x <= x && shipX >= x && this.ships[i].hp != 0){
                this.ships[i].ship.hit()
                this.ships[i].hp--;
            }
            else{
                this.board[x][y] = 'X'
            }
        }

    }
    checkShips(){
        for(let i = 0;i<this.ships.length;i++){
           if(this.ships.hp != 0){
                return;
           }
        }
        return 0
    }

}
class player extends gameboard{}

function playersTurn(board){
    
}

function startGame(){
    const p1 = new player()
    const p2 = new player()
    const item = document.querySelectorAll(".dragable")
    const containers = document.querySelectorAll(".squares")
    const grid = document.querySelector(".board-1")
    const grid2 = document.querySelector(".board-2")
    item.forEach((i) =>{
        i.addEventListener("dragstart",()=>{
            i.classList.add('dragging')

        })
        i.addEventListener("dragend",()=>{
            i.classList.remove('dragging')
        })
    })
    containers.forEach((container)=>{
        container.addEventListener('dragover',(e)=>{
            e.preventDefault()
            const draggable = document.querySelector(".dragging")
            
            if(container.childElementCount == 0 ){
                container.appendChild(draggable)
            }
            
        })
    })

    grid.addEventListener("click",e =>{
        let c = "";
        if(e.target.draggable){
            
            c = e.target.parentNode.parentNode.children
        }
        else{
            c = e.target.parentNode.children
            
        }
        
        for(let i =0;i<c.length;i++){
            
            if(c[i] === e.target.parentNode || c[i] === e.target){
                console.log(`row = ${(Math.floor(i/5))} col = ${(i%5)}`);
                break;
            }
            
        }
        

    })

}
startGame()
