import {Garage} from './Component/Lot'
import './App.css';
import {useState} from "react";
import SingleLot from "./Component/SingleLot";
import Button from 'react-bootstrap/Button'


import 'bootstrap/dist/css/bootstrap.min.css';
import AcceptVehicleForm from "./Component/AcceptVehicleForm";


function App() {
  const [garage, setGarage] = useState(new Garage());
  const [first, setFirst] = useState({});
  const [second, setSecond] = useState({});
  const [third, setThird] = useState({});

  const [showForm, setShowForm] = useState(false);
  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
      <>
          {
              garage.lots.map((lot, index) => <SingleLot name={index + 1} lot={lot}/>)

          }
          <Button variant={"outline-info"} size={"lg"} onClick={handleShowForm}>Accept Vehicle</Button>

          <AcceptVehicleForm show={showForm} handleClose={handleCloseForm} lots={garage.lots}></AcceptVehicleForm>
      </>
  );
}

export default App;
