class Lot {
    constructor(lotNumber, occupied = false, plateNumber = "", timeParked = null) {
        this.lotNumber = lotNumber;
        this.occupied = occupied;
        this.plateNumber = plateNumber;
        this.entryTime = timeParked;
        this.duration = 0;
        this.totalCharge = 0;
    }
}

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

export {Lot, Garage};
