import { BaseCellularAutomaton } from "./BaseCellularAutomaton.js";

export class WaTorAutomaton extends BaseCellularAutomaton{

    static optionDict = {

    }
    static TILE_STYLES = {
        "PREY" : {
            strokeWidth: 0,
            strokeColor : "green",
            fillColor : "green"
        },
        "EMPTY" : {
            strokeWidth: 0,
            strokeColor : "white",
            fillColor : "white"
        },
        "HUNTER" : {
            strokeWidth: 0,
            strokeColor : "red",
            fillColor : "red"
        },

    }

    PREY_REPRODUCTION_AGE = 10;
    HUNTER_REPRODUCTION_AGE = 10;
    HUNTER_START_ENERGY = 100;
    HUNTER_PREY_ENERGY_GAIN = 10;

    age = 0;
    energy = 0;



    constructor(tile, options){
        super(tile)
        this.tile_styles = WaTorAutomaton.TILE_STYLES
        this.states = Object.keys(this.tile_styles);
        this.state = this.states[Math.floor(Math.random()*this.states.length)];
        if(this.state == "HUNTER"){
            this.energy = this.HUNTER_START_ENERGY;
        }
    }

    setAge(age){
        this.age = age;
    }

    setNextState(state){
        this.nextState = state;
    }

    setEnergy(energy){
        this.energy = energy;
    };

    setEmpty(){
        this.setNextState(null);
        this.setAge(0);
        this.setEnergy(0);
    }

    moveAutomaton(newAutomaton, newEnergy){
        if(!newAutomaton.nextState){
            newAutomaton.setNextState(this.state);
            newAutomaton.setAge(this.age + 1);
            newAutomaton.setEnergy(newEnergy);
        }
        this.setEmpty()
    }

    reproduceAutomaton(newAutomaton, newEnergy, startEnergy){
        //the old automaton moves
        if(!newAutomaton.nextState){
            newAutomaton.setNextState(this.state);
            newAutomaton.setAge(0);
            newAutomaton.setEnergy(newEnergy);
        }


        //The new automaton gets born on the old tile
        if(!this.nextState){
            this.setNextState(this.state);
            this.age = 0;
            this.energy = startEnergy; 
        }
    }
    
    stepUpdate(){
        let neighbours = this.tile.getNeighbourTiles().map(tile => tile.getContent());
        let emptyNeighbours = neighbours.filter( automaton => automaton.state == "EMPTY" && (automaton.nextState =="EMPTY" || !automaton.nextState))   


        if(this.state == "PREY"){
            //At each chronon, a fish moves randomly to one of the adjacent unoccupied squares. 
            //If there are no free squares, no movement takes place.
            if(emptyNeighbours.length > 0){
                let randomNeighbour = emptyNeighbours[Math.floor(Math.random()*emptyNeighbours.length)];
                //Once a fish has survived a certain number of chronons it may reproduce. 
                //This is done as it moves to a neighbouring square, 
                //leaving behind a new fish in its old position. Its reproduction time is also reset to zero.
                if(this.age >= this.PREY_REPRODUCTION_AGE){
                    this.reproduceAutomaton(randomNeighbour, 0, 0);
                } else {
                    this.moveAutomaton(randomNeighbour, 0);
                }
            //if there are no free neighbours, just increase the age by one.
            //No reproduction can take place.
            } else {
                this.moveAutomaton(this, 0)
            }
        }

        if(this.state == "HUNTER"){
            //Upon reaching zero energy, a shark dies.
            if(this.energy <= 0){
                this.setNextState("EMPTY")
                return;
            }


            let preyNeighbours = neighbours.filter( automaton => automaton.state == "PREY" || automaton.nextState =="PREY")
            //At each chronon, a shark moves randomly to an adjacent square occupied by a fish. 
            if(preyNeighbours.length > 0){
                let randomPreyNeighbour = preyNeighbours[Math.floor(Math.random()*preyNeighbours.length)];
                //Once a shark has survived a certain number of chronons 
                // it may reproduce in exactly the same way as the fish.
                if(this.age >= this.HUNTER_REPRODUCTION_AGE){
                    this.reproduceAutomaton(randomPreyNeighbour, this.energy + this.HUNTER_PREY_ENERGY_GAIN, this.HUNTER_START_ENERGY )
                }else{
                    //Hunter moves and ages
                    this.moveAutomaton(randomPreyNeighbour, this.energy + this.HUNTER_PREY_ENERGY_GAIN);
                }
            }
            //If there is none with fish, the shark moves to a random adjacent unoccupied square. 
            else if(emptyNeighbours.length > 0){
                let randomEmptyNeighbour = emptyNeighbours[Math.floor(Math.random()*emptyNeighbours.length)];

                if(this.age >= this.HUNTER_REPRODUCTION_AGE){
                    this.reproduceAutomaton(randomEmptyNeighbour, this.energy - 1, this.HUNTER_START_ENERGY )
                }else{
                    //Hunter moves and ages
                    this.moveAutomaton(randomEmptyNeighbour, this.energy - 1);
                }
            }

            //If there are no free squares, no movement takes place.
            else{
                this.moveAutomaton(this, this.energy - 1);
            }
        }
        if(this.state == "EMPTY"){
            if(!this.nextState){
                this.setNextState("EMPTY");
            }
        }


    }
}