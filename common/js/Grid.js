import { Tile } from "./Tile.js"

const svgGrid = (function () {
    let svgElement;
    let gridHolderElement;
    let width;
    let height;

    const tiles = new Array();

    //A percentage based ViewBox for the svg is used.
    //The full grid has a viewbox of 100 by 100.
    //By changing the viewbox we can zoom in or out and 
    //look at different parts of the grid.
    const viewBox = {
        minX: 0,
        minY: 0,
        width: 0,
        height: 0
    }

    function viewBoxToString() {
        return `${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`
    }

    function updateViewBox(minX, minY, width, height) {
        viewBox.minX = minX;
        viewBox.minY = minY;
        viewBox.width = width;
        viewBox.height = height;

        svgElement.setAttribute("viewBox", viewBoxToString())
        updateTiles();
    }

    function getViewBox() {
        return viewBox;
    }

    function init(element, horizontalTileCount, verticalTileCount) {
        gridHolderElement = element;
        width = horizontalTileCount;
        height = verticalTileCount;
        initSVGElement();
        initTiles();
    }

    function initSVGElement() {
        svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute("viewBox", viewBoxToString())
        gridHolderElement.appendChild(svgElement)
    }

    function getSVGElement() {
        return svgElement;
    }

    function updateTiles() {
        tiles.forEach(tile => {
            if (isTileVisible(tile.x, tile.y)) {
                tile.appendHTMLElementToDom()
            } else {
                tile.removeHTMLElementFromDom()
            }
        })
    }

    function isTileVisible(x, y) {
        let left = viewBox.minX;
        let top = viewBox.minY;
        let right = viewBox.minX + viewBox.width;
        let bottom = viewBox.minY + viewBox.height;

        let tileWidth = 100 / getWidth()
        let tileHeight = 100 / getHeigth()
        let tileXpos = x * tileWidth;
        let tileYpos = y * tileHeight;

        if (tileXpos + 2 * tileWidth > left &&
            tileXpos < right &&
            tileYpos + 2 * tileHeight > top &&
            tileYpos < bottom) {
            return true;
        }
        else {
            return false;
        }

    }

    function initTiles() {
        let tile;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                tile = new Tile(x, y, svgGrid)
                tiles.push(tile);
            }
        }
    }

    function getTile(x, y) {
        return tiles[x + y * width]
    }

    function getWidth() {
        return width;
    }

    function getHeigth() {
        return height;
    }




    return {
        init: init,
        getWidth: getWidth,
        getHeigth: getHeigth,
        getSVGElement: getSVGElement,
        updateViewBox: updateViewBox,
        getViewBox: getViewBox
    }
})();


export { svgGrid }