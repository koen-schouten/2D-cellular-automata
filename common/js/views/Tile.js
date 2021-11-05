export class Tile{
    useElement;

    constructor(x, y, grid, tileType){
        this.x = x;
        this.y = y;
        this.tileType = tileType;
        this.grid = grid;
        this.createHTMLElement();
    }

    createHTMLElement(){
        this.useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        this.useElement.setAttributeNS('http://www.w3.org/1999/xlink','href',"#" + this.tileType.id);
        this.useElement.setAttribute("x", this.getX())
        this.useElement.setAttribute("y", this.getY())
    }

    appendHTMLElementToDom(){
        let svgElement = this.grid.getSVGElement();
        svgElement.appendChild(this.useElement);
    }


    updateHTMLElement(tileType){
        this.tileType = tileType;
        this.useElement.setAttributeNS('http://www.w3.org/1999/xlink','href',"#" + tileType.id);
    }

    removeHTMLElementFromDom(){
        this.useElement.remove();
    }

    getX(){
        return this.x * (100 / this.grid.getWidth());
    }

    getY(){
        return this.y * (100 / this.grid.getHeigth());
    }
}