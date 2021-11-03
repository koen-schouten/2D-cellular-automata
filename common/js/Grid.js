import {Tile} from "./Tile.js"

const svgGrid = (function(){
    let svgElement;
    let gridHolderElement;
    let width;
    let height;

    const tiles = new Array(); 

    //A percentage based ViewBox for the svg is used.
    //The full grid has a viewbox of 100 by 100.
    //By changing the viewbox we can zoom in or out and 
    //look at different parts of the grid.
    const viewBox = { minX: 0,
        minY: 0,
        width: 100,
        height: 100
    }

    function viewBoxToString(){
        return `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`
    }

    function updateViewBox(minX, minY, width, height){
        viewBox.minX = minX;
        viewBox.minY = minY;
        viewBox.width = width;
        viewBox.height = height;

        svgElement.setAttribute("viewBox", viewBoxToString())
    }

    function getViewBox(){
        return viewBox;
    }

    function init(element, horizontalTileCount, verticalTileCount){
        gridHolderElement = element;
        width = horizontalTileCount;
        height = verticalTileCount;
        initSVGElement();
        initTiles();
    }

    function initSVGElement(){
        svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute("viewBox", viewBoxToString())
        gridHolderElement.appendChild(svgElement)
    }

    function getSVGElement(){
        return svgElement;
    }

    function updateTiles(){
        

    }

    function initTiles(){
        let tile;
        for(let x = 0; x < width; x++){
            for(let y = 0; y < height; y++){
                tile = new Tile(x, y , svgGrid)
                tiles.push(tile);
            }
        }
    }

    function getTile(x, y){
        return tiles[x + y * width]
    }

    function getWidth(){
        return width;
    }

    function getHeigth(){
        return height;
    }




    return {init: init,
            getWidth: getWidth,
            getHeigth: getHeigth,
            getSVGElement: getSVGElement,
            updateViewBox: updateViewBox,
            getViewBox: getViewBox}
})();


export {svgGrid}