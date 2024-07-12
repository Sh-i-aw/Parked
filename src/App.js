import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Garage} from './Component/Garage'
import SingleLot from "./Component/SingleLot";
import AcceptInGarageForm from "./Component/AcceptInGarageForm";

import {useEffect, useState} from "react";
import {Container, Row, Col, Button} from "react-bootstrap";


function App() {
    const [garage, setGarage] = useState(new Garage());
    const [showAcceptInGarageForm, setShowAcceptInGarageForm] = useState(false);
    const [showReleaseForm, setShowReleaseForm] = useState(0);
    const [showAcceptForm, setShowAcceptForm] =useState(0);
    const [lotToFree, setLotToFree] = useState(0);

    const handleShowAcceptForm = () => setShowAcceptInGarageForm(true);
    const handleCloseAcceptInGarageForm = () => setShowAcceptInGarageForm(false);
    const handleCloseAcceptForm = () => setShowAcceptForm(0);
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
        setLotToFree(0);
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
          isFull: garage.occupancy + 1 === garage.capacity,
      };
      setGarage(newGarage);
  }

  return (
      <Container fluid>
          <Row className="vh-100">
              <Col sm={2} className="navColumn">
                      <h3>Garage Status</h3>
                      <p>Occupancy: {garage.occupancy}</p>
                      <p>IsFull: {garage.isFull ? 'yup' : 'nah-uh'}</p>
                  <Button variant={"outline-info"} size={"lg"}
                          onClick={handleShowAcceptForm}
                          disabled={garage.isFull}
                  >
                      Accept Vehicle
                  </Button>
              </Col>
              <Col>

                  {
                      garage.lots.map((lot) => {
                          return <SingleLot key={lot.lotNumber}
                                            shouldShowReleaseForm={showReleaseForm === lot.lotNumber}
                                            openReleaseForm={lotToRelease => setShowReleaseForm(lotToRelease)}
                                            closeReleaseForm={handleCloseReleaseForm}
                                            releaseVehicle={(lotToRelease) => setLotToFree(lotToRelease)}

                                            shouldShowAcceptForm={showAcceptForm === lot.lotNumber}
                                            openAcceptForm={lotToAccept => setShowAcceptForm(lotToAccept)}
                                            closeAcceptForm={handleCloseAcceptForm}
                                            lot={lot}/>
                      })
                  }


                  <AcceptInGarageForm show={showAcceptInGarageForm}
                                      handleClose={handleCloseAcceptInGarageForm}
                                      lots={garage.lots}
                                      registerVehicle={registerVehicle}
                  >

                  </AcceptInGarageForm>

              </Col>
          </Row>
      </Container>

  );
}

export default App;
