import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Garage} from './Component/Lot'
import SingleLot from "./Component/SingleLot";
import AcceptVehicleForm from "./Component/AcceptVehicleForm";

import {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button'






function App() {
    const [garage, setGarage] = useState(new Garage());
    const [showAcceptForm, setShowAcceptForm] = useState(false);
    const [showReleaseForm, setShowReleaseForm] = useState(0);
    const [lotToFree, setLotToFree] = useState(0);
    const handleShowAcceptForm = () => setShowAcceptForm(true);
    const handleCloseAcceptForm = () => setShowAcceptForm(false);
    const handleCloseReleaseForm = () => setShowReleaseForm(0);


    useEffect(() => {
        if (lotToFree === 0) return;
        const newLots = [...garage.lots];
        newLots[lotToFree - 1] = {
            ...newLots[lotToFree - 1],
            occupied: false,
            plateNumber: "",
            entryTime : null,
            duration : 0,
            totalCharge: 0,
        }

        const newGarage = {
            ...garage,
            lots: newLots,
            occupancy: garage.occupancy - 1,
            isFull: false,
        }

        setGarage(newGarage);

    }, [lotToFree]);

  const registerVehicle = (parkedVehicle) => {

      const newLots = [...garage.lots];
      newLots[parkedVehicle.lot - 1]  = {
          ...newLots[parkedVehicle.lot - 1],
          occupied: true,
          plateNumber: parkedVehicle.plate,
          entryTime: parkedVehicle.entryTime,
      };
      console.log(garage.occupancy);
      const newGarage = {
          ...garage,
          lots: newLots,
          occupancy: garage.occupancy + 1,
          isFull: garage.occupancy + 1 === 3,
      };
      setGarage(newGarage);
  }

  return (
      <>
          <h3>Garage Status</h3>
          <h3>Occupancy: {garage.occupancy}</h3>
          <h3>IsFull: {garage.isFull ? 'yup' : 'nah-uh'}</h3>
          {
              garage.lots.map((lot) => {
                  return <SingleLot key={lot.lotNumber}
                                    shouldShowForm={showReleaseForm === lot.lotNumber}
                                    openForm={lotToRelease => setShowReleaseForm(lotToRelease)}
                                    closeForm={handleCloseReleaseForm}
                                    releaseVehicle={(lotToRelease) => setLotToFree(lotToRelease)}
                                    lot={lot}/>
              })
          }

          <Button variant={"outline-info"} size={"lg"} onClick={handleShowAcceptForm}>Accept Vehicle</Button>
          <AcceptVehicleForm show={showAcceptForm} handleClose={handleCloseAcceptForm} lots={garage.lots} registerVehicle={registerVehicle}></AcceptVehicleForm>
      </>
  );
}

export default App;
