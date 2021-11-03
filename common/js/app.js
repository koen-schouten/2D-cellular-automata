import {svgGrid} from './Grid.js';

function init(){
    const gridHolderElement = document.getElementById("gridHolder");
    svgGrid.init(gridHolderElement, 100 , 100);
    addDragListener(svgGrid);
}


//Code for dragging the image.
//TODO: make it work for touchscreens
function addDragListener(svgGrid){
    let svg = svgGrid.getSVGElement()
    let pt = svg.createSVGPoint()
    let svgViewBox = svgGrid.getViewBox();

    let dragging = false;
    let startX = 0;
    let startY = 0;

    svg.addEventListener("mousedown", event => {
        dragging = true    
        pt.x = event.clientX;
        pt.y = event.clientY;
        let cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
        startX = cursorpt.x;
        startY = cursorpt.y;
    })


    svg.addEventListener("mousemove", event => {
        if(dragging){
            pt.x = event.clientX;
            pt.y = event.clientY
            let cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
            let newX = svgViewBox.minX - (cursorpt.x - startX);
            let newY = svgViewBox.minY - (cursorpt.y - startY);
            svgGrid.updateViewBox(newX, newY, svgViewBox.width, svgViewBox.height)
        }
    })
    svg.addEventListener("mouseup", event => {dragging = false})
}



window.addEventListener('DOMContentLoaded', e=>{
    init();
});



