import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Garage} from './Component/Lot'
import SingleLot from "./Component/SingleLot";
import AcceptVehicleForm from "./Component/AcceptVehicleForm";

import {useState} from "react";
import Button from 'react-bootstrap/Button'






function App() {
    const [garage, setGarage] = useState(new Garage());
    const [showAcceptForm, setShowAcceptForm] = useState(false);
    const [showReleaseForm, setShowReleaseForm] = useState(false);
    const handleShowAcceptForm = () => setShowAcceptForm(true);
    const handleCloseAcceptForm = () => setShowAcceptForm(false);
    const handleShowReleaseForm = (lotToRelease) => setShowReleaseForm(lotToRelease);
    const handleCloseReleaseForm = () => setShowReleaseForm(false);


  const registerVehicle = (parkedVehicle) => {

      const newLots = [...garage.lots];
      newLots[parkedVehicle.lot - 1]  = {
          ...newLots[parkedVehicle.lot - 1],
          occupied: true,
          plateNumber: parkedVehicle.plate,
          timeParked: parkedVehicle.parkedTime,
      };

      const newGarage = {
          ...garage,
          lots: newLots,
      };

      setGarage(newGarage);
  }

  return (
      <>
          {
              garage.lots.map((lot) => {
                  return <SingleLot key={lot.lotNumber}
                                    showReleaseForm={showReleaseForm === lot.lotNumber}
                                    handleOpen={handleShowReleaseForm}
                                    handleClose={handleCloseReleaseForm}
                                    lot={lot}/>
              })
          }

          <Button variant={"outline-info"} size={"lg"} onClick={handleShowAcceptForm}>Accept Vehicle</Button>
          <AcceptVehicleForm show={showAcceptForm} handleClose={handleCloseAcceptForm} lots={garage.lots} registerVehicle={registerVehicle}></AcceptVehicleForm>
      </>
  );
}

export default App;
