export class TileType{
    constructor(grid, id, strokeWidth="0.01", strokeColor="#000", fillColor="#fff"){
        this.id = id;
        this.strokeWidth = strokeWidth
        this.strokeColor = strokeColor
        this.fillColor = fillColor
        this.grid = grid;
        this.createHTMLElement();
    }

    createHTMLElement(){
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        g.setAttribute("id", this.id);

        rectElement.setAttribute("x", 0);
        rectElement.setAttribute("y", 0);
        rectElement.setAttribute("width", this.getWidth());
        rectElement.setAttribute("height", this.getHeigth());
        rectElement.setAttribute("stroke", this.strokeColor);
        rectElement.setAttribute("stroke-width", this.strokeWidth);
        rectElement.setAttribute("fill", this.fillColor);

        g.appendChild(rectElement);
        defs.appendChild(g);
        this.grid.getSVGElement().appendChild(defs);
    }

    getWidth(){
        return 100 / this.grid.getWidth();
    }

    getHeigth(){
        return 100 / this.grid.getHeigth();
    }
}