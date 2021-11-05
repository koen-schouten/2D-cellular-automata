import { svgGrid } from './views/SVGGrid.js';
import { automatonGrid } from './CellularAutomatons/AutomatonGrid.js';
import { GameOfLife } from './CellularAutomatons/GameOfLife.js';

const gridSize = 500;

function init() {
    const gridHolderElement = document.getElementById("gridHolder");

    automatonGrid.init(gridSize, gridSize, GameOfLife)
    //automatonGrid.updateGrid();
    svgGrid.init(gridHolderElement, gridSize, gridSize, GameOfLife.TILE_STYLES);

    attachAutomatonObservers(automatonGrid, svgGrid);
    svgGrid.setViewBox(50, 50, 5, 5);


    document.getElementById("updateButton").addEventListener("click", (e) =>{
        automatonGrid.updateGrid();
    })
    runGame(automatonGrid)
}

function runGame(automatonGrid){
    setTimeout( () =>{ 
        automatonGrid.updateGrid();
        runGame(automatonGrid)
    },
    0);
}

function attachAutomatonObservers(automatonGrid, svgGrid){
    let automatonTiles = automatonGrid.getTiles();
    automatonTiles.forEach(automatonTile => {
        let x = automatonTile.x;
        let y = automatonTile.y;
        let automaton = automatonTile.getContent();

        let svgTile = svgGrid.getTile(x, y);
        automaton.subscribe(automaton => {svgTile.updateHTMLElement(automaton.state) } );
    });

}


window.addEventListener('DOMContentLoaded', e => {
    init();
});



