export class Tile{
    content;

    constructor(x, y, grid){
        this.content = content;
        this.x = x;
        this.y = y;
        this.grid = grid;
    }
    
    setContent(content){
        this.content = content;
    }

    getContent(){
        return this.content;
    }

    getNorthTile(){
        return this.grid.getTile(this.x, this.y - 1);
    }

    getEastTile(){
        return this.grid.getTile(this.x + 1, this.y);
    }

    getSouthTile(){
        return this.grid.getTile(this.x, this.y + 1)
    }

    getWestTile(){
        return this.grid.getTile(this.x - 1, this.y - 1)
    }

    getNorthEastTile(){
        return this.grid.getTile(this.x + 1, this.y - 1)
    }

    getSouthEastTiles(){
        return this.grid.getTile(this.x + 1, this.y + 1)
    }

    getSouthWestTile(){
        return this.grid.getTile(this.x - 1, this.y + 1)
    }

    getNorthWestTile(){
        return this.grid.getTile(this.x - 1, this.y - 1)
    }

    getNeighbourTiles(){
        let  tiles = [];
        tiles.push(this.getNorthTile());
        tiles.push(this.getEastTile());
        tiles.push(this.getSouthTile());
        tiles.push(this.getWestTile());
        tiles.push(this.getNorthEastTile());
        tiles.push(this.getSouthEastTiles());
        tiles.push(this.getSouthWestTile());
        tiles.push(this.getNorthWestTile());
        tiles = tiles.filter(tile => tile != null)

        return tiles;
    }

}