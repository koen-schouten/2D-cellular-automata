import { Tile } from "./Tile.js"

const svgGrid = (function () {
    let svgElement;
    let gridHolderElement;
    let width;
    let height;


    const tiles = new Array();
    const visibleTiles = new Set();

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
        let oldViewBox = {
            minX: viewBox.minX,
            minY: viewBox.minY,
            width: viewBox.width,
            height: viewBox.height
        }

        viewBox.minX = minX;
        viewBox.minY = minY;
        viewBox.width = width;
        viewBox.height = height;

        svgElement.setAttribute("viewBox", viewBoxToString())
        updateTiles(oldViewBox);
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

    /**
     * This function updates the tiles when we change the viewBox of the SVG.
     * @param {*} oldViewBox 
     */
    function updateTiles(oldViewBox) {
        const zoomedIn = oldViewBox.width > viewBox.width && oldViewBox.height > viewBox.width
        const zoomedOut = oldViewBox.width < viewBox.width && oldViewBox.height < viewBox.width
        const zoomed = zoomedIn || zoomedOut;

        const dx = viewBox.minX - oldViewBox.minX
        const dy = viewBox.minY - oldViewBox.minY

        let tileWidth = 100 / getWidth()
        let tileHeight = 100 / getHeigth()

        let minX = viewBox.minX;
        let maxX = viewBox.minX + viewBox.width;
        let minY = viewBox.minY;
        let maxY = viewBox.minY + viewBox.height;

        let oldMaxY = oldViewBox.minY + oldViewBox.height;
        let oldMaxX = oldViewBox.minX + oldViewBox.height;

        let newLeftmostTile = Math.max(0, Math.floor(minX / tileWidth));
        let newRightmostTile = Math.min(width - 1, Math.ceil(maxX / tileWidth));
        let newTopmostTile = Math.max(0, Math.floor(minY / tileHeight));
        let newBottommostTile = Math.min(height - 1, Math.ceil(maxY / tileHeight));

        let oldLeftmostTile = Math.max(0, Math.floor(oldViewBox.minX / tileWidth));
        let oldRightmostTile = Math.min(width - 1, Math.ceil(oldMaxX / tileWidth));
        let oldTopmostTile = Math.max(0, Math.floor(oldViewBox.minY / tileHeight));
        let oldBottommostTile = Math.min(height - 1, Math.ceil(oldMaxY / tileHeight));

        function UpdateTileBlock(minX, maxX, minY, maxY, func) {
            for (let x = minX; x <= maxX; x++) {
                for (let y = minY; y <= maxY; y++) {
                    let tile = getTile(x, y)
                    func(tile)
                }
            }
        }

        function addTileToDom(tile) {
                //Only add tiles when they aren't in the visible tiles set
                tile.appendHTMLElementToDom();
        }

        function removeTileFromDom(tile) {
                tile.removeHTMLElementFromDom();
                visibleTiles.delete(tile);
        }

        if (zoomedIn) {
            UpdateTileBlock(oldLeftmostTile, oldRightmostTile, oldTopmostTile, oldBottommostTile, removeTileFromDom);
            UpdateTileBlock(newLeftmostTile, newRightmostTile, newTopmostTile, newBottommostTile, addTileToDom);
        } else if (zoomedOut) {
            //When zooming out we only add new tiles. Only new tiles become visible. 
            //We don't have to remove old tiles.

            //When zooming out, we only need to update the 4 sides. The center tiles don't need to be updated.
            //TOP
            UpdateTileBlock(newLeftmostTile, oldRightmostTile, newTopmostTile, oldTopmostTile, addTileToDom);
            //RIGHT
            UpdateTileBlock(oldRightmostTile, newRightmostTile, newTopmostTile, oldBottommostTile, addTileToDom);
            //BOTTOM
            UpdateTileBlock(oldLeftmostTile, newRightmostTile, oldBottommostTile, newBottommostTile, addTileToDom);
            //LEFT
            UpdateTileBlock(newLeftmostTile, oldLeftmostTile, oldTopmostTile, newBottommostTile, addTileToDom);
        } else if (!zoomed) {
            //When we are not zooming. We are moving. In that case we need to check how far we moved
            //and update the tile that gets shifted in and out of view.
            if (dx <= 0 && dy <= 0) {
                //shift to top left
                //update top
                UpdateTileBlock(newLeftmostTile, newRightmostTile, newTopmostTile, oldTopmostTile, addTileToDom);
                //update left
                UpdateTileBlock(newLeftmostTile, oldLeftmostTile, newTopmostTile, newBottommostTile, addTileToDom);
                //remove bottom
                UpdateTileBlock(oldLeftmostTile, oldRightmostTile, newBottommostTile, oldBottommostTile - 1, removeTileFromDom);
                //remove right
                UpdateTileBlock(newRightmostTile, oldRightmostTile - 1, oldTopmostTile, oldBottommostTile, removeTileFromDom);
            } else if (dx <= 0 && dy >= 0) {
                //shift to bottom left
                //update bottom
                UpdateTileBlock(newLeftmostTile, newRightmostTile, oldBottommostTile, newBottommostTile, addTileToDom);
                //update left
                UpdateTileBlock(newLeftmostTile, oldLeftmostTile, newTopmostTile, newBottommostTile, addTileToDom);
                //remove top
                UpdateTileBlock(oldLeftmostTile, oldRightmostTile, oldTopmostTile, newTopmostTile - 1, removeTileFromDom);
                //remove right
                UpdateTileBlock(newRightmostTile, oldRightmostTile - 1, oldTopmostTile, oldBottommostTile, removeTileFromDom);
            } else if (dx >= 0 && dy >= 0) {
                //shift to bottom right
                //update bottom
                UpdateTileBlock(newLeftmostTile, newRightmostTile, oldBottommostTile, newBottommostTile, addTileToDom);
                //update right
                UpdateTileBlock(oldRightmostTile, newRightmostTile, newTopmostTile, newBottommostTile, addTileToDom);
                //remove top
                UpdateTileBlock(oldLeftmostTile, oldRightmostTile, oldTopmostTile, newTopmostTile - 1, removeTileFromDom);
                //remove left
                UpdateTileBlock(oldLeftmostTile, newLeftmostTile - 1, oldTopmostTile, oldBottommostTile - 1, removeTileFromDom);
            } else if (dx >= 0 && dy <= 0) {
                //shift to top right
                //update top
                UpdateTileBlock(newLeftmostTile, newRightmostTile, newTopmostTile, oldTopmostTile, addTileToDom);
                //update right
                UpdateTileBlock(oldRightmostTile, newRightmostTile, newTopmostTile, newBottommostTile, addTileToDom);
                //remove left
                UpdateTileBlock(oldLeftmostTile, newLeftmostTile - 1, oldTopmostTile, oldBottommostTile, removeTileFromDom);
                //remove bottom
                UpdateTileBlock(oldLeftmostTile, oldRightmostTile, newBottommostTile, oldBottommostTile - 1, removeTileFromDom);
            }
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
        return tiles[y + x * width]
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