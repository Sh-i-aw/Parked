class Lot {
    constructor(occupied = false, plateNumber = "", timeParked = null) {
        this.occupied = occupied;
        this.plateNumber = plateNumber;
        this.timeParked = timeParked;
    }
}

class Garage {
    constructor(numberOfLots = 3) {
        this.isFull = false;
        this.occupancy = 0;
        this.lots = Array.from({length:numberOfLots}, () => new Lot());
    }
}

export {Lot, Garage};
