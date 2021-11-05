export class Tile{
    _content;

    constructor(x, y, grid){
        this.x = x;
        this.y = y;
        this.grid = grid;
    }
    
    setContent(content){
        this._content = content;
    }

    getContent(){
        return this._content;
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
        return this.grid.getTile(this.x - 1, this.y)
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