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

export {Lot};
