export class Tile{
    rectElement;


    constructor(x, y, grid, strokeWidth="0.01", strokeColor="#000", fillColor="#fff"){
        this.x = x;
        this.y = y;
        this.strokeWidth = strokeWidth
        this.strokeColor = strokeColor
        this.fillColor = fillColor
        this.grid = grid;
        this.createHTMLElement();
    }

    createHTMLElement(){
        this.rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        this.rectElement.setAttribute("data-gridX", this.x)
        this.rectElement.setAttribute("data-gridY", this.y)

        this.rectElement.setAttribute("x", this.getX())
        this.rectElement.setAttribute("y", this.getY())
        this.rectElement.setAttribute("width", this.getWidth())
        this.rectElement.setAttribute("height", this.getHeigth())
        this.rectElement.setAttribute("stroke", this.strokeColor)
        this.rectElement.setAttribute("stroke-width", this.strokeWidth)
        this.rectElement.setAttribute("fill", this.fillColor)
    }

    appendHTMLElementToDom(){
        let svgElement = this.grid.getSVGElement();
        svgElement.appendChild(this.rectElement);
    }

    updateHTMLElement(){
        this.rectElement.setAttribute("stroke", this.strokeColor)
        this.rectElement.setAttribute("stroke-width", this.strokeWidth)
        this.rectElement.setAttribute("fill", this.fillColor)
    }

    removeHTMLElementFromDom(){
        this.rectElement.remove();
    }

    setFillColor(color){
        this.fillColor = color;
        this.updateHTMLElement();
    }

    setStrokeColor(color){
        this.strokeColor = color;
        this.updateHTMLElement();
    }

    setStrokeWidth(width){
        this.setStrokeWidth = width;
        this.updateHTMLElement();
    }

    getX(){
        return this.x * (100 / this.grid.getWidth());
    }

    getY(){
        return this.y * (100 / this.grid.getHeigth());
    }

    getWidth(){
        return 100 / this.grid.getWidth();
    }

    getHeigth(){
        return 100 / this.grid.getHeigth();
    }

}