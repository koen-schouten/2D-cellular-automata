import { svgGrid } from './Grid.js';

function init() {
    const gridHolderElement = document.getElementById("gridHolder");
    svgGrid.init(gridHolderElement, 100, 100);
    addDragListener(svgGrid);
    addZoomListeners(svgGrid);

    svgGrid.updateViewBox(50, 50, 5, 5);
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
        console.log(event.deltaY);
        pt.x = event.clientX;
        pt.y = event.clientY;

        //cursorpt is mouse position in viewbox
        let cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());

        //zoom in 
        if (event.deltaY < 0) {
            //zoom should happen around mouse position in viewbox.
            let centerX = cursorpt.x;
            let centerY = cursorpt.y;

            let newWidth = svgViewBox.width / 2;
            let newHeight = svgViewBox.height / 2;

            svgGrid.updateViewBox(centerX - newWidth / 2,
                centerY - newHeight / 2,
                newWidth,
                newHeight)

        }
        //zoom out
        if (event.deltaY > 0) {
            //zoom should happen around mouse position in viewbox.
            let centerX = cursorpt.x;
            let centerY = cursorpt.y;

            let newWidth = svgViewBox.width * 2;
            let newHeight = svgViewBox.height * 2;
            svgGrid.updateViewBox(centerX - newWidth / 2,
                centerY - newHeight / 2,
                newWidth,
                newHeight)
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
            svgGrid.updateViewBox(newX, newY, svgViewBox.width, svgViewBox.height)
        }
    })
    svg.addEventListener("mouseup", event => { dragging = false })

    svg.addEventListener("mouseleave", event => { dragging = false })
}



window.addEventListener('DOMContentLoaded', e => {
    init();
});



