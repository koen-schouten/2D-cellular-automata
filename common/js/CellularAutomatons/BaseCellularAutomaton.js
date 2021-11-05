export class BaseCellularAutomaton{
    state;

    observerhandlers = [];

    constructor(tile){
        this.tile = tile;
    }

    subscribe(fn){
        this.observerhandlers.push(fn);
        //call when subscribing to get initial data
        fn(this);
    }

    unsubscribe(fn) {
        this.observerhandlers = this.observerhandlers.filter(
            function (item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }

    fire() {
        this.observerhandlers.forEach(fn=>{
            fn(this);
        });
    }
    




}