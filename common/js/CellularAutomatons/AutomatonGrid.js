import { Tile } from "./Tile.js";

const automatonGrid = (function () {

    const tiles = new Array();
    let _width;
    let _height;
    let _wrapping = true;
    let _automaton;
    let _automatonOptions;


    function init(width, height, automaton, automatonOptions){
        _automatonOptions = automatonOptions;
        _automaton = automaton;
        _width = width;
        _height = height;
        initTiles();
    }

    function initTiles(){
        let tile;
        for (let x = 0; x < _width; x++) {
            for (let y = 0; y < _height; y++) {
                tile = new Tile(x, y, automatonGrid)
                tile.setContent(new _automaton(tile, _automatonOptions))
                tiles.push(tile);
            }
        }
    }

    function getTile(x, y) {
        if(_wrapping){
            return tiles[((y + _height)% _height) + ((x + _width) % _width)* _width];
        }else if(x >= 0 && x < _width && y >= 0 && y < _height){
            return tiles[y + x * _width];
        }else{
            return null;
        }
    }

    function updateGrid(){
        tiles.forEach(tile => tile.getContent().update())
    }

    function getTiles(){
        return tiles;
    }



    return {
        getTiles: getTiles,
        updateGrid: updateGrid,
        getTile: getTile,
        init: init
    }
})();

export {automatonGrid}
