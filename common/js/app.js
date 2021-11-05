import { svgGrid } from './views/Grid.js';

const gridSize = 250;

function init() {
    const gridHolderElement = document.getElementById("gridHolder");
    svgGrid.init(gridHolderElement, gridSize, gridSize);
    svgGrid.updateViewBox(50, 50, 5, 5);
}




window.addEventListener('DOMContentLoaded', e => {
    init();
});



