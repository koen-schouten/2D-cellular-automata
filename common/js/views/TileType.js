export class TileType{
    constructor(grid, id, style){
        this.id = id;
        this.strokeWidth = style.strokeWidth
        this.strokeColor = style.strokeColor
        this.fillColor = style.fillColor
        this.grid = grid;
        this.createHTMLElement();
    }

    createHTMLElement(){
        const defs = this.grid.getSVGElement().getElementsByTagName('defs')[0];
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
    }

    getWidth(){
        return 100 / this.grid.getWidth();
    }

    getHeigth(){
        return 100 / this.grid.getHeigth();
    }
}