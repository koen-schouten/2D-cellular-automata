import { BaseCellularAutomaton } from "./BaseCellularAutomaton.js";

export class GameOfLife extends BaseCellularAutomaton{

    static optionDict = {

    }
    static TILE_STYLES = {
        "ALIVE" : {
            strokeWidth: 0,
            strokeColor : "blue",
            fillColor : "blue"
        },
        "DEATH" : {
            strokeWidth: 0,
            strokeColor : "#fff",
            fillColor : "#fff"
        }
    }


    static STATE_ALIVE = "ALIVE";
    static STATE_DEATH = "DEATH"; 
    static STATES = [this.STATE_ALIVE, this.STATE_DEATH]

    constructor(tile, options){
        super(tile)
        //TODO change this from random to an argument from constructor
        this.state = GameOfLife.STATES[Math.floor(Math.random()*GameOfLife.STATES.length)];
    }
    
    updateState(newState){
        this.state = newState;
        //update observers
        this.fire();
    }

    getNextState(){
        let newState = this.state;
        let neighbours = this.tile.getNeighbourTiles().map(tile => tile.getContent());
        let aliveNeighbourCount = neighbours.filter(neighbour => neighbour.state == GameOfLife.STATE_ALIVE).length
        
        if(this.state == GameOfLife.STATE_ALIVE){
            //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            if(aliveNeighbourCount < 2){
                newState = GameOfLife.STATE_DEATH;
            }
            //Any live cell with more than three live neighbours dies, as if by overpopulation.
            else if(aliveNeighbourCount > 3){
                newState = GameOfLife.STATE_DEATH;
            }
            
        }else if(this.state == GameOfLife.STATE_DEATH){
            //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            if(aliveNeighbourCount == 3){
                newState = GameOfLife.STATE_ALIVE;
            }
        }

        return newState;
    }

}