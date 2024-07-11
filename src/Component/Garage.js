import {Lot} from "./Lot";

class Garage {
    constructor(capacity = 3) {
        this.capacity = capacity;
        this.isFull = false;
        this.occupancy = 0;
        this.lots = Array.from({length:this.capacity}, (_, index) =>  {
            return new Lot(index + 1)
        });
    }
}

export {Garage};