import { svgGrid } from './Grid.js';

const gridSize = 500;

function init() {
    const gridHolderElement = document.getElementById("gridHolder");
    svgGrid.init(gridHolderElement, gridSize, gridSize);
    addDragListener(svgGrid);
    addZoomListeners(svgGrid);
    svgGrid.updateViewBox(50, 50, 10/gridSize, 10/gridSize);
}


/**
 * Function that adds eventlisters for zooming when scrolling the mouse.
 */
function addZoomListeners(svgGrid) {
    let svg = svgGrid.getSVGElement()
    let pt = svg.createSVGPoint()
    let svgViewBox = svgGrid.getViewBox();

    svg.addEventListener("wheel", event => {
        event.preventDefault();
        let zoomSpeed = 1.25;
        pt.x = event.clientX;
        pt.y = event.clientY;

        //cursorpt is mouse position in viewbox
        let cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());

        //zoom in 
        if (event.deltaY < 0) {
            //zoom should happen around mouse position in viewbox.
            let centerX = cursorpt.x;
            let centerY = cursorpt.y;

            let newWidth = svgViewBox.width / zoomSpeed;
            let newHeight = svgViewBox.height / zoomSpeed;

            svgGrid.updateViewBox(centerX - newWidth / 2,
                centerY - newHeight / 2,
                newWidth,
                newHeight)
        }
        //zoom out
        if (event.deltaY > 0) {
            //zoom should happen around old center
            let centerX = (svgViewBox.minX + svgViewBox.width/2);
            let centerY = (svgViewBox.minY + svgViewBox.height/2);
            let newWidth = svgViewBox.width * zoomSpeed;
            let newHeight = svgViewBox.height * zoomSpeed;

            //Limit the zoom to 100%
            if(newWidth <= 100 && newHeight <= 100){
                svgGrid.updateViewBox(centerX - (newWidth / 2),
                    centerY - (newHeight / 2),
                    newWidth,
                    newHeight)
            }
            console.log(svgGrid.getViewBox());

        }
    })
}




//Code for dragging the image.
//TODO: make it work for touchscreens
function addDragListener(svgGrid) {
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
        //cursorpt is mouse position in viewbox
        let cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
        startX = cursorpt.x;
        startY = cursorpt.y;
    })


    svg.addEventListener("mousemove", event => {
        if (dragging) {
            pt.x = event.clientX;
            pt.y = event.clientY
            //cursorpt is mouse position in viewbox
            let cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
            let newX = svgViewBox.minX - (cursorpt.x - startX);
            let newY = svgViewBox.minY - (cursorpt.y - startY);
            console.time('Execution Time');
            svgGrid.updateViewBox(newX, newY, svgViewBox.width, svgViewBox.height);
            console.timeEnd('Execution Time');
        }
    })
    svg.addEventListener("mouseup", event => { dragging = false })

    svg.addEventListener("mouseleave", event => { dragging = false })
}



window.addEventListener('DOMContentLoaded', e => {
    init();
});



