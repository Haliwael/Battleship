const item = document.querySelectorAll(".dragable")
const containers = document.querySelectorAll(".squares")
const body = document.querySelector("body")
const grid = document.querySelector(".board-1")
const grid2 = document.querySelector(".board-2")
const btn = document.querySelector(".start")
const pop = document.querySelector(".pop-up")
const hit = '<span class="material-symbols-outlined" style="pointer-events: none; user-select:none;">close</span>';
const gameOver = document.querySelector(".gameOver")
let turn = 0;
let isShipsPlaced = false;
let gameStatus = 1
class ship{
    constructor(x,y,length){
        this.length = length;
        this.hits = 0;
        this.x = x;
        this.y = y;
    }
    hit(){
        this.hits++;
    }
    isSunk(){
        return this.hits >= this.length ? true : false;
    }
}

class gameboard{
    constructor(){
        
        this.ships = []
        
    }
    placeShip(s){
        this.ships.push(new ship(s.x,s.y,1))
    }
    receiveAttack(x,y){
    
        for(let i = 0;i<this.ships.length;i++){
            if(this.ships[i].x == x && this.ships[i].y == y){
                this.ships[i].hit();
                break;
            }
        }
        

    }
    checkShips(){
        for(let i = 0;i<this.ships.length;i++){
            if(!this.ships[i].isSunk()){
                return false;
            }
        }
        return true;
    }

}
class player extends gameboard{}
const p1 = new player()
const p2 = new player()


//code to drag the ships to the gameboard 
item.forEach((i) =>{
    i.addEventListener("dragstart",()=>{
        if(!isShipsPlaced){
            if(i.parentNode.parentNode.classList.contains("player-1")){
                i.classList.add('dragging-1')
            }
            if(i.parentNode.parentNode.classList.contains("player-2")){
                i.classList.add('dragging-2')
            }
            
        }
        

    })
    i.addEventListener("dragend",()=>{
        if (!isShipsPlaced) {
            if(i.parentNode.parentNode.classList.contains("player-1")){
                i.classList.remove('dragging-1')
            }
            if(i.parentNode.parentNode.classList.contains("player-2")){
                i.classList.remove('dragging-2')
            }
        }
    })
    })
containers.forEach((container)=>{
        container.addEventListener('dragover',(e)=>{
            e.preventDefault()
            let draggable = null;
            
            if(container.childElementCount == 0 && !isShipsPlaced ){
                if( container.parentNode.classList.contains("board-1")){
                    draggable = document.querySelector(".dragging-1")
                    container.appendChild(draggable)
                }
                if( container.parentNode.classList.contains("board-2")){
                    draggable = document.querySelector(".dragging-2")
                    container.appendChild(draggable)
                }
            }
            
            
        })
    })

//button to start the game 
btn.addEventListener("click",()=>{

    placingShips(p1,grid)
    placingShips(p2,grid2)
    
    if(p1.ships.length < 3 || p2.ships.length < 3){
        alert("place all your ships")
    }
    else{
        
        startGame() 
    }
   
})
function board1(e){
    let c = "";

        if(turn == 0 && gameStatus == 1){
            
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
                        

                    }
                }
                
            }
            if(p1.checkShips()){
                gameStatus = 0
                gameOver.classList.add("active")
                pop.innerHTML = `<p>Player 2 won</p>
                <button onclick="location.reload()">Play again</button>`
                
            }
            
            

        }
        
}
function board2(e){
    if(turn == 1 && gameStatus == 1){
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
        if(p2.checkShips()){
            gameStatus = 0;
            gameOver.classList.add("active")
            pop.innerHTML = `<p>Player 1 won</p>
            <button onclick="location.reload()">Play again</button>`
                
        }
     
        

    }
    

}
function placingShips(p,grid){
    for(let i = 0;i<grid.children.length;i++){
        
        if(grid.children[i].children.length != 0){
            
            p.placeShip(getShipsCordonates(grid.children[i].children[0],grid))
            
        }
    }
}
function getShipsCordonates(ship,g){
    for(let i = 0;i<g.children.length;i++){
      
        if(g.children[i].children[0] == ship){
            return {x : Math.floor(i/5), y : i%5}
        }
    }
}
function startGame(){
    btn.classList.add("gameStarted")
    isShipsPlaced = true;
    grid2.classList.add("turn")
    grid.addEventListener("click",board1)
    grid2.addEventListener("click",board2)
}


