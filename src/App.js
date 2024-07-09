import logo from './logo.svg';
import Lot from './Component/Lot'
import './App.css';
import {useState} from "react";
import SingleLot from "./Component/SingleLot";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [garageFull, setGarageFull] = useState(false);
  const [first, setFirst] = useState({});
  const [second, setSecond] = useState({});
  const [third, setThird] = useState({});

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

    function isEmptyLot (lot) {
        return Object.keys(lot).length === 0;
    }

  return (
      <>
          <SingleLot name={"First lot"} lot={first}></SingleLot>
          <SingleLot name={"Second Lot"} lot={second}></SingleLot>
          <SingleLot name={"Third Lot"} lot={third}></SingleLot>
          <Button variant={"outline-info"} size={"lg"} onClick={handleShowForm}>Accept Vehicle</Button>

          <Modal
            show={showForm}
            onHide={handleCloseForm}
            backdrop={"static"}
            keyboard={false}
          >
              <Modal.Header closeButton>
                    <Modal.Title>Register a vehicle</Modal.Title>
              </Modal.Header>

                <Modal.Body>
                Enter vehicle info here.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"info"} onClick={handleCloseForm}>
                        Complete
                    </Button>
                </Modal.Footer>

          </Modal>
      </>
  );
}

export default App;
