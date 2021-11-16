import { BaseCellularAutomaton } from "./BaseCellularAutomaton.js";

export class GameOfLife extends BaseCellularAutomaton{
    static optionDict = {
    }
    static TILE_STYLES = {
        "DEATH" : {
            strokeWidth: 0,
            strokeColor : "#fff",
            fillColor : "#fff"
        },
        "ALIVE" : {
            strokeWidth: 0,
            strokeColor : "blue",
            fillColor : "blue"
        },
    }

    constructor(tile, options){
        super(tile)
        this.tile_styles = GameOfLife.TILE_STYLES
        this.states = Object.keys(this.tile_styles);
        //TODO change this from random to an argument from constructor
        this.state = this.states[Math.floor(Math.random()*this.states.length)];
    }
    
    setNextState(){
        this.nextState = this.state;
        let neighbours = this.tile.getNeighbourTiles().map(tile => tile.getContent());
        let aliveNeighbourCount = neighbours.filter(neighbour => neighbour.state ==  "ALIVE").length
        
        //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        if(aliveNeighbourCount <= 1){
            this.nextState = "DEATH";
        }
        //Any live cell with more than three live neighbours dies, as if by overpopulation.
        if(aliveNeighbourCount == 3){
            this.nextState = "ALIVE";
        }
        //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        if(aliveNeighbourCount >= 4){
            this.nextState = "DEATH";
        }
    }

}