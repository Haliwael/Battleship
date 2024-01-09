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
            [1,0,1,0,0],
            [0,0,0,0,0],
            [0,0,0,1,0],
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
    
        this.board[x][y] = 0
        

    }
    checkShips(){
        for(let i = 0;i<5;i++){
            for(let j = 0;j<5;j++){
                if(this.board[i][j] == 1){
                    return
                }

            }
        }
        return 0
    }

}
class player extends gameboard{}

function playersTurn(board){
    
}

function startGame(){
    let isShipsPlaced = true;
    const hit = '<span class="material-symbols-outlined" style="pointer-events: none; user-select:none;">close</span>';
    const bnt = document.querySelector('button')
    const p1 = new player()
    const p2 = new player()
    const item = document.querySelectorAll(".dragable")
    const c = document.querySelector(".container")
    const containers = document.querySelectorAll(".squares")
    const grid = document.querySelector(".board-1")
    const grid2 = document.querySelector(".board-2")
    if(!isShipsPlaced){
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

    }
    
    let turn = 0;
    grid2.classList.add("turn")
    
    grid.addEventListener("click",e =>{
        let c = "";

        if(turn == 0){
            
            if(e.target.draggable){
                
                c = e.target.parentNode.parentNode.children
            }
            else{
                c = e.target.parentNode.children
                
            }
            
            for(let i =0;i<c.length;i++){
                
                if(c[i] === e.target.parentNode || c[i] === e.target){
                    if(!c[i].classList.contains("hitted")){
                        p1.receiveAttack(Math.floor(i/5),i%5);
                        c[i].innerHTML = hit
                        c[i].classList.add("hitted")
                        turn = 1;
                        grid2.classList.remove("turn")
                        grid.classList.add("turn")
                        break;
                        p

                    }
                }
                
            }
            if(p1.checkShips() == 0){
                console.log("player 2 won");
            }
            
            

        }
        
        
        
        

    })
    grid2.addEventListener("click",e =>{
        if(turn == 1){
            let c = "";
            
            if(e.target.draggable){
                
                c = e.target.parentNode.parentNode.children
            }
            else{
                c = e.target.parentNode.children
                
            }
            
             
            for(let i =0;i<c.length;i++){
                
                if(c[i] === e.target.parentNode || c[i] === e.target){
                    if(!c[i].classList.contains("hitted")){
                        p2.receiveAttack(Math.floor(i/5),i%5);
                        c[i].innerHTML = hit
                        c[i].classList.add("hitted")
                        turn = 0;
                        grid.classList.remove("turn")
                        grid2.classList.add("turn")
                        
                       
                        break;

                    }
                }
                
            }
            if(p2.checkShips() == 0){
                console.log("player 1 won");
            }
         
            

        }
        

    })
    
    
        
            
        
       
            

        


    
    
    
    

}
startGame()
