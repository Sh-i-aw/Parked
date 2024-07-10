class Lot {
    constructor(lotNumber, occupied = false, plateNumber = "", timeParked = null) {
        this.lotNumber = lotNumber;
        this.occupied = occupied;
        this.plateNumber = plateNumber;
        this.timeParked = timeParked;
    }
}

class Garage {
    constructor(numberOfLots = 3) {
        this.isFull = false;
        this.occupancy = 0;
        this.lots = Array.from({length:numberOfLots}, (_, index) =>  {
            return new Lot(index + 1)
        });
    }
}

export {Lot, Garage};
