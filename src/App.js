import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Garage} from './Component/Lot'
import SingleLot from "./Component/SingleLot";
import AcceptVehicleForm from "./Component/AcceptVehicleForm";

import {useState} from "react";
import Button from 'react-bootstrap/Button'






function App() {
  const [garage, setGarage] = useState(new Garage());
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

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
              garage.lots.map((lot) => <SingleLot key={lot.lotNumber} name={lot.lotNumber} lot={lot}/>)

          }
          <Button variant={"outline-info"} size={"lg"} onClick={handleShowForm}>Accept Vehicle</Button>

          <AcceptVehicleForm show={showForm} handleClose={handleCloseForm} lots={garage.lots} registerVehicle={registerVehicle}></AcceptVehicleForm>
      </>
  );
}

export default App;
